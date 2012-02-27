Obj = function(images){
	Sprite.call(this);
	var _this = this;
	this.anchorX = 400;
	this.anchorY = 300;
	this.speed = 200;
	this.collisionR = 20;
	this.scale = 1;
	this.duration = 100;
	this.img = images.sprite5;
	//this.spriteList.push([0,0,120,120]);
	//this.spriteList.push([227,0,226,226]);
	//this.img = images.sprite2;
	//this.spriteList.push([22,7,95,95]);
	//this.spriteList.push([141,7,95,95]);
	//this.spriteList.push([261,7,95,95]);
	
};

function main1(){

	function start(images){
		obj = new Obj(images);
		obj.calRegionCoord(4,4);
		ticker = new Ticker("",60);//frequency
		ticker.addEvent(obj.frameCtrl);
		ticker.start();
	}

	var imgresource = {
		sprite1:"resource/spriteimg/images.jpg",
		sprite2:"resource/spriteimg/sprite.jpg",
		sprite3:"resource/spriteimg/02.png",
		sprite4:"resource/spriteimg/03.png",
		sprite5:"resource/spriteimg/012-Lancer04.png"
	};

	new ImgLoader(imgresource,start);

	var evtMgr = new EventManager();

	evtMgr.addKeyEvent(38,function(){
		obj.direction = 3;
		obj.eventSource = "key";
		obj.setDest(400,200);
	});
	evtMgr.addKeyEvent(39,function(){
		obj.direction = 2;
		obj.eventSource = "key";
		obj.setDest(500,300);
	});
	evtMgr.addKeyEvent(40,function(){
		obj.direction = 0;
		obj.eventSource = "key";
		obj.setDest(400,400);
	});
	evtMgr.addKeyEvent(37,function(){
		obj.direction = 1;
		obj.eventSource = "key";
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
