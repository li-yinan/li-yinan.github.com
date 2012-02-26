Obj = function(images){
	Sprite.call(this);
	var _this = this;
	this.speed = 100;
	this.img = images.sprite;
};

function main1(){

	function start(images){
		obj = new Obj(images);
		ticker = new Ticker("",1000/60);//frequency
		ticker.addEvent(obj.frameCtrl);
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
