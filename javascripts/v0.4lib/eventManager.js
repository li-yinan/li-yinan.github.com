EventManager = function(){
	var evtList = [];

	var eventSelector = function(evt){
		console.log("keycode is "+evt.keyCode);
		if(evtList[evt.keyCode]){
			evtList[evt.keyCode]();
		}
	};

	this.addEvent = function(value,callback){
			evtList[value] = callback;
	}

	if(document.attachEvent){
		document.attachEvent("onkeydown",eventSelector);
	}else if(document.addEventListener){
		document.addEventListener("keydown",eventSelector);
	}

};
