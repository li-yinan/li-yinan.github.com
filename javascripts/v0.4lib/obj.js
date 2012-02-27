Obj = function(images){
	Sprite.call(this);
	var _this = this;
	this.speed = 100;
	this.scale = 1;
	this.img = images.sprite2;
	this.spriteList.push([22,7,95,95]);
	this.spriteList.push([141,7,95,95]);
	this.spriteList.push([261,7,95,95]);
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
		sprite2:"resource/spriteimg/sprite.jpg"
	};

	new ImgLoader(imgresource,start);

	var evtMgr = new EventManager();

	evtMgr.addKeyEvent(38,function(){
		obj.setDest(50,0);
	});
	evtMgr.addKeyEvent(39,function(){
		obj.setDest(100,50);
	});
	evtMgr.addKeyEvent(40,function(){
		obj.setDest(50,100);
	});
	evtMgr.addKeyEvent(37,function(){
		obj.setDest(0,50);
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
