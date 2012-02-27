Obj = function(images){
	Sprite.call(this);
	var _this = this;
	this.anchorX = 400;
	this.anchorY = 300;
	this.speed = 200;
	this.collisionR = 50;
	this.scale = 4;
	this.duration = 1000;
	this.img = images.sprite2;
	this.spriteList.push([0,0,300,300]);
	//this.img = images.sprite2;
	//this.spriteList.push([22,7,95,95]);
	//this.spriteList.push([141,7,95,95]);
	//this.spriteList.push([261,7,95,95]);
};

function main1(){

	function start(images){
		obj = new Obj(images);
		ticker = new Ticker("",60);//frequency
		ticker.addEvent(obj.frameCtrl);
		ticker.start();
	}

	var imgresource = {
		sprite1:"resource/spriteimg/images.jpg",
		sprite2:"resource/spriteimg/sprite.jpg",
		sprite2:"resource/spriteimg/02.png"
	};

	new ImgLoader(imgresource,start);

	var evtMgr = new EventManager();

	evtMgr.addKeyEvent(38,function(){
		obj.setDest(400,200);
	});
	evtMgr.addKeyEvent(39,function(){
		obj.setDest(500,300);
	});
	evtMgr.addKeyEvent(40,function(){
		obj.setDest(400,400);
	});
	evtMgr.addKeyEvent(37,function(){
		obj.setDest(300,300);
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
