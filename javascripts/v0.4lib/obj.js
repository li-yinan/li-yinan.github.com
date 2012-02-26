Obj = function(images){
	Sprite.call(this);
	var _this = this;
	this.img = images.sprite;
	var _cxt=document.getElementById("canvas").getContext("2d");
	this.setDest = function(destX,destY){
		_this.destX = destX;
		_this.destY = destY;
	}
	this.moveTo = function(){
		var sx = _this.anchorX;
		var sy = _this.anchorY;
		var dx = _this.destX;
		var dy = _this.destY;
		if(Math.abs(sx-dx)<1&&Math.abs(sy-dy)<1){
			return;
		}
		var unit = _this.speed/1000/Math.sqrt((dx-sx)*(dx-sx)+(dy-sy)*(dy-sy));
		//var test1 = (dx-sx)*(dx-sx)+(dy-sy)*(dy-sy);
		//var test2 = Math.sqrt((dx-sx)*(dx-sx)+(dy-sy)*(dy-sy));
		_this.anchorX = unit*(dx-sx)+sx;
		_this.anchorY = unit*(dy-sy)+sy;
		console.log("moveto override");
	};
	this.draw = function(){
		_cxt.clearRect(0,0,800,600);
		_cxt.drawImage(_this.img,_this.anchorX-_this.collisionR/2,_this.anchorY-_this.collisionR/2,_this.collisionR,_this.collisionR);
	}
};

function main1(){

	function start(images){
		obj = new Obj(images);
		ticker = new Ticker("",10);
		ticker.getPhysics().addEvent(obj.moveTo);
		ticker.getPhysics().addEvent(obj.draw);
		ticker.getPhysics().start();
	}
	var imgresource = {
		sprite:"resource/spriteimg/images.jpg"
	};
	new ImgLoader(imgresource,start);
	var evtMgr = new EventManager();
	evtMgr.addEvent(38,function(){
		obj.setDest(50,0);
	});
	evtMgr.addEvent(39,function(){
		obj.setDest(100,50);
	});
	evtMgr.addEvent(40,function(){
		obj.setDest(50,100);
	});
	evtMgr.addEvent(37,function(){
		obj.setDest(0,50);
	});
};

window.onload = main1;
