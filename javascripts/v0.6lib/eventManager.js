EventManager = function(){
	var keyEvtList = [];
	var leftClickEvt;
	var rightClickEvt;
	var _world = resource.world;
	var canvas = document.getElementById("canvas");

	var eventSelector = function(evt){
		console.log("keycode is "+evt.keyCode);
		if(keyEvtList[evt.keyCode]){
			keyEvtList[evt.keyCode]();
		}
	};
	var eventMouse = function(evt){
		var canvas = document.getElementById("canvas");
		if(!evt.pageX){
			evt.pageX = evt.clientX+document.body.scrollLeft;
		}
		if(!evt.pageY){
			evt.pageY = evt.clientY+document.body.scrollTop;
		}
		var container = document.getElementById("container");
		var containerX = evt.pageX - container.offsetLeft;
		var containerY = evt.pageY - container.offsetTop;
		var coordX = containerX;
		var coordY = containerY;
		//console.log("coordx is "+coordX+",coordy is "+coordY);
		//console.log("containerX is "+containerX+",containerY is "+containerY);
		if(evt.button == 2){
			//right button
			//console.log("right click");
			if(rightClickEvt){
				rightClickEvt(coordX,coordY);
			}
		}else{
			if(leftClickEvt){
				leftClickEvt(coordX,coordY);
			}
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
