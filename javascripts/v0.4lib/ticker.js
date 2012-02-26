Ticker = function(resource,tick){
	var _evtList = [];
	var _tickptr;
	var _tick = tick;
	var _this = this;

	this.getTick = function(){
		return _tick;
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
		_tickptr = setInterval(_this.doEvent, _tick);
	};

	this.stop = function(){
		clearInterval(_tickptr);
	}
};
