Obj = function(images){
	Sprite.call(this);
	var _this = this;
	this.speed = 100;
	this.img = images.sprite;
	var _cxt=document.getElementById("canvas").getContext("2d");
	this.moveTo = function(){
		var sx = _this.anchorX;
		var sy = _this.anchorY;
		var dx = _this.destX;
		var dy = _this.destY;
		//if near destination then stop move
		if(Math.abs(sx-dx)<3&&Math.abs(sy-dy)<3){
			//ticker.clearEvent(moveptr);
			return;
		}
		var tick = ticker.getTick();
		var unit = _this.speed/Math.sqrt((dx-sx)*(dx-sx)+(dy-sy)*(dy-sy))*tick/1000;
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
		ticker = new Ticker("",1000/60);//frequency
		moveptr = ticker.addEvent(obj.moveTo);
		ticker.addEvent(obj.draw);
		ticker.start();
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
