Ticker = function(freq){
	if(!freq){
		freq = 60;
	}
	var _evtList = [];
	var _tickptr;
	var _freq = freq;
	var _this = this;
	var _active = false;
	var _counter = 0;

	this.getCounter = function(){
		return _counter;
	}

	this.getFreq = function(){
		return _freq;
	};

	this.isActive = function(){
		return _active;
	};

	this.addEvent = function(evt){
		_evtList.push(evt);
		return _evtList.length-1;
	};

	this.clearEvent = function(i){
		_evtList[i] = undefined; 
	};

	this.doEvent = function(){
		_counter++;
		for(var i=0;i<_evtList.length;i++){
			if(_evtList[i]){
				setTimeout(_evtList[i],0);
			}
		}
	};

	this.start = function(){
		_active = true;
		_tickptr = setInterval(_this.doEvent, 1000/_freq);
		// frame self adaptation
		var lastcnt = 0;
		var score = document.getElementById("scorer");
		//add a 1min timer to count ticks
		setInterval(function(){
			var frame = _counter-lastcnt;
			//console.log("ticks in 1min is"+(_counter-lastcnt));
			score.innerHTML = frame;
			if(_freq-frame>3){
				_this.restart(frame);
			}else{
				_this.restart(_freq+1);
			}
			lastcnt = _counter;
		}, 1000);
		// frame self adaptation end
	};

	this.restart = function(freq){
		if(freq>60){freq=60;}
		_freq = freq;
		clearInterval(_tickptr);
		_tickptr = setInterval(_this.doEvent, 1000/_freq);
	};

	this.stop = function(){
		_active = false;
		clearInterval(_tickptr);
	}
};
