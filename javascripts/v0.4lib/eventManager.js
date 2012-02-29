EventManager = function(){
	var keyEvtList = [];
	var mouseEvt;
	var canvas = document.getElementById("canvas");

	var eventSelector = function(evt){
		console.log("keycode is "+evt.keyCode);
		if(keyEvtList[evt.keyCode]){
			keyEvtList[evt.keyCode]();
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
	var eventMouse = function(evt){
		var canvas = document.getElementById("canvas");
		var coordX = evt.pageX - canvas.offsetLeft;
		var coordY = evt.pageY - canvas.offsetTop;
		mouseEvt(coordX,coordY);
	}
	this.addMouseEvent = function(callback){
		mouseEvt = callback;
	}

	this.addKeyEvent = function(value,callback){
			keyEvtList[value] = callback;
	}

	if(document.attachEvent){
		document.attachEvent("onkeydown",eventSelector);
		canvas.attachEvent("onclick",eventMouse);
	}else if(document.addEventListener){
		document.addEventListener("keydown",eventSelector,true);
		canvas.addEventListener("click",eventMouse,true);
	}

};
