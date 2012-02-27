Ticker = function(resource,freq){
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
	};

	this.stop = function(){
		_active = false;
		clearInterval(_tickptr);
	}
};
