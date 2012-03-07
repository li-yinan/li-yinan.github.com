EventManager = function(wd){
	var keyEvtList = [];
	var leftClickEvt;
	var rightClickEvt;
	var _world = wd;
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
		//var coordX = evt.pageX - canvas.offsetLeft - _world.left;
		//var coordY = evt.pageY - canvas.offsetTop - _world.top;
		var container = document.getElementById("container");
		var containerX = evt.pageX - container.offsetLeft;
		var containerY = evt.pageY - container.offsetTop;
		var coordX = containerX - _world.left;
		var coordY = containerY - _world.top;
		console.log("coordx is "+coordX+",coordy is "+coordY);
		console.log("containerX is "+containerX+",containerY is "+containerY);
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
		//canvas.attachEvent("onmousedown",eventMouse);
		//canvas.oncontextmenu = function(){return false;};
		container.attachEvent("onmousedown",eventMouse);
		container.oncontextmenu = function(){return false;};
	}else if(document.addEventListener){
		document.addEventListener("keydown",eventSelector,false);
		//canvas.addEventListener("mousedown",eventMouse,false);
		//canvas.oncontextmenu = function(){return false;};
		container.addEventListener("mousedown",eventMouse,false);
		container.oncontextmenu = function(){return false;};
	}
};
