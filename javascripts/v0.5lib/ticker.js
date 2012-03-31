/**
 * @brief 
 *
 * @param freq frequency
 * @param auto whether auto change freq
 *
 * @return 
 */
Ticker = function(freq){
	if(!freq){
		freq = 60;
	}
	var _timeStamp = (new Date()).valueOf();
	var _timeEvtList = [];
	var _tickEvtList = [];
	var _tickptr;
	var _freq = freq;
	var _this = this;
	var _active = false;

	/**
	 * @brief add a tick event ,triggered every tick
	 *
	 * @param evt
	 *
	 * @return 
	 */
	this.addTickEvent = function(evt){
		_tickEvtList.push(function(t){
			evt(t);
		});
	};

	/**
	 * @brief add a timer event
	 *
	 * @param duration trigger duration
	 * @param execTimes trigger times
	 * @param evt event 
	 *
	 * @return 
	 */
	this.addTimeEvent = function(duration,execTimes,evt){
		var now = (new Date()).valueOf();
		// delay none after add event
		_timeEvtList.push([now,duration,execTimes,function(t){
			evt(t);
		},now]);
		// delay duration after add event
		//_timeEvtList.push([now+duration,duration,execTimes,function(t){
		//	evt(t);
		//},now]);
		return now;
	};

	this.addDelayTimeEvent = function(duration,execTimes,evt){
		var now = (new Date()).valueOf();
		// delay duration after add event
		_timeEvtList.push([now+duration,duration,execTimes,function(t){
			evt(t);
		},now]);
		return now;
	};

	this.removeTimeEvent = function(ptr){
		for(var i=0;i<_timeEvtList.length;i++){
			if(_timeEvtList[i]&&_timeEvtList[i][4]==ptr){
				_timeEvtList[i] = undefined;
			}
		}
	};

	this.clearEvent = function(){
		var temp =[];
		for(var i=0;i<_tickEvtList.length;i++){
			if(_tickEvtList[i]){
				temp.push(_tickEvtList[i]);
			}
		}
		_tickEvtList = temp;
		temp = [];
		for(var i=0;i<_timeEvtList.length;i++){
			if(_timeEvtList[i]){
				temp.push(_timeEvtList[i]);
			}
		}
		_timeEvtList = temp;
	};



	this.doEvent = function(){
		var now = (new Date()).valueOf();
		var t = now - _timeStamp;
		_timeStamp = now;
		//do event list
		for(var i=0;i<_tickEvtList.length;i++){
			if(_tickEvtList[i]){
				_tickEvtList[i](t);
			}
		}
		for(var i=0;i<_timeEvtList.length;i++){
			if(_timeEvtList[i] && _timeEvtList[i][0]<now && _timeEvtList[i][2]){
				//execute function
				_timeEvtList[i][3](_timeEvtList[i][1]);
				//whether this evt is removed in execution
				if(!_timeEvtList[i]){
					continue;
				}
				//calculate next timestamp
				_timeEvtList[i][0] = _timeEvtList[i][1]+_timeStamp;
				//execute time --
				_timeEvtList[i][2]--;
				if(_timeEvtList[i][2]==0){
					_timeEvtList[i] = undefined;
				}
			}
		}
	};

	this.start = function(){
		_tickptr = setInterval(_this.doEvent, 1000/_freq);
	}

	this.restart = function(freq){
		if(freq>60){freq=60;}
		if(freq<30){freq=30;}
		_freq = freq;
		clearInterval(_tickptr);
		_tickptr = setInterval(_this.doEvent, 1000/_freq);
	};

	this.stop = function(){
		_active = false;
		clearInterval(_framecnt);
		clearInterval(_tickptr);
	}

	this.addTimeEvent(100,Number.MAX_VALUE,function(){
		_this.clearEvent();
	});
};
