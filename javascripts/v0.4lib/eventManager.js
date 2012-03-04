EventManager = function(){
	var keyEvtList = [];
	var leftClickEvt;
	var rightClickEvt;
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
		//console.log("mouse event");
		var canvas = document.getElementById("canvas");
		var coordX = evt.pageX - canvas.offsetLeft;
		var coordY = evt.pageY - canvas.offsetTop;
		if(evt.button == 2){
			//right button
			//console.log("right click");
			rightClickEvt(coordX,coordY);
		}else{
			leftClickEvt(coordX,coordY);
		}
	}
	this.addRightClickEvent= function(callback){
		rightClickEvt = callback;
	}
	this.addLeftClickEvent= function(callback){
		leftClickEvt = callback;
	}

	this.addKeyEvent = function(value,callback){
			keyEvtList[value] = callback;
	}

	if(document.attachEvent){
		document.attachEvent("onkeydown",eventSelector);
		canvas.attachEvent("onmousedown",eventMouse);
		canvas.oncontextmenu = function(){return false;};
	}else if(document.addEventListener){
		document.addEventListener("keydown",eventSelector,true);
		canvas.addEventListener("mousedown",eventMouse,true);
		canvas.addEventListener("contextmenu",function(){return false;},true);
		canvas.oncontextmenu = function(){return false;};
	}
};
