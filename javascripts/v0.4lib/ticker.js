Ticker = function(resource,freq){
	var _evtList = [];
	var _tickptr;
	var _freq = freq;
	var _this = this;

	this.getFreq = function(){
		return _freq;
	};

	this.addEvent = function(evt){
		_evtList.push(evt);
		return _evtList.length-1;
	};

	this.clearEvent = function(i){
		_evtList[i] = undefined; 
	};

	this.doEvent = function(){
		for(var i=0;i<_evtList.length;i++){
			if(_evtList[i]){
				setTimeout(_evtList[i],0);
			}
		}
	};

	this.start = function(){
		_tickptr = setInterval(_this.doEvent, 1000/_freq);
	};

	this.stop = function(){
		clearInterval(_tickptr);
	}
};
