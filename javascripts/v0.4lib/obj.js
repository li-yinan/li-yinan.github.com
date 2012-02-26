Obj = function(images){
	Sprite.call(this);
	this.img = images.sprite;
	var _cxt=document.getElementById("canvas").getContext("2d");
	this.moveTo = function(destX,destY){
		console.log("moveto override");
	};
	this.draw = function(){
		_cxt.clearRect(0,0,800,600);
		_cxt.drawImage(this.img,this.anchorX,this.anchorY,200,200);
	}
};

function main1(){
	function start(images){
		obj = new Obj(images);
		obj.draw();
	}
	var imgresource = {
		sprite:"resource/spriteimg/images.jpg"
	};
	new ImgLoader(imgresource,start);
	var evtMgr = new EventManager();
	evtMgr.addEvent(38,function(){
		obj.anchorY-=10;
		obj.draw();
	});
	evtMgr.addEvent(39,function(){
		obj.anchorX+=10;
		obj.draw();
	});
	evtMgr.addEvent(40,function(){
		obj.anchorY+=10;
		obj.draw();
	});
	evtMgr.addEvent(37,function(){
		obj.anchorX-=10;
		obj.draw();
	});
};

window.onload = main1;
