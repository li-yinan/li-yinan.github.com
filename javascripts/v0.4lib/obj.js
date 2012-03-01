Obj = function(images){
	Sprite.call(this);
	var _this = this;
	this.img = images.sprite5;
	this.anchorX = 400;
	this.anchorY = 300;
	this.destX = 400;
	this.destY = 300;
	this.speed = 200;
	this.collisionR = 16;
	this.duration = 100;
	this.drawCollisionCircle = true;
	//this.offset = -20;
	//this.scale = 1;
	//this.radian = Math.PI*2/2;
	//this.alpha = 0.5;
	//this.movable = false;
	
	//call sperate img into sprite function
	this.calRegionCoord(4,4);
};

function main1(){

	function start(images){
		obj = new Obj(images);
		ticker = new Ticker(60,false);//frequency
		ticker.addEvent(obj.frameCtrl);
		ticker.start();
	}

	var imgresource = {
		//sprite1:"resource/spriteimg/images.jpg",
		//sprite2:"resource/spriteimg/sprite.jpg",
		//sprite3:"resource/spriteimg/02.png",
		//sprite4:"resource/spriteimg/03.png",
		sprite5:"resource/spriteimg/012-Lancer04.png"
	};

	new ImgLoader(imgresource,start);

	var evtMgr = new EventManager();

	evtMgr.addKeyEvent(38,function(){
		obj.setDest(obj.destX,obj.destY-100);
	});
	evtMgr.addKeyEvent(39,function(){
		obj.setDest(obj.destX+100,obj.destY);
	});
	evtMgr.addKeyEvent(40,function(){
		obj.setDest(obj.destX,obj.destY+100);
	});
	evtMgr.addKeyEvent(37,function(){
		obj.setDest(obj.destX-100,obj.destY);
	});

	evtMgr.addMouseEvent(function(x,y){
		obj.setDest(x,y);
	});

	evtMgr.addKeyEvent(32,function(){
		if(ticker.isActive()){
			ticker.stop();
		}else{
			ticker.start();
		}
	});
};

window.onload = main1;
