EventManager = function(){
	var evtList = [];

	var eventSelector = function(evt){
		console.log("keycode is "+evt.keyCode);
		if(evtList[evt.keyCode]){
			evtList[evt.keyCode]();
		}
		//if (evt&&evt.stopPropagation ){
		//	evt.stopPropagation();
		//}else{
		//	window.event.cancelBubble = true;
		//}
        //if(evt&&evt.preventDefault){
        //    evt.preventDefault();
		//}else{
        //    window.event.returnValue = false;
		//}
        //return false;
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
