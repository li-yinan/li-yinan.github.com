Obj = function(){
	Sprite.call(this);
	this.moveTo = function(destX,destY){
		console.log("moveto override");
	};
	this.draw = function(){
		var c=document.getElementById("canvas");
		var cxt=c.getContext("2d");
		var img = new Image();
		var imgresource = {
			sprite:"resource/spriteimg/images.jpg"
		}
		new ImgLoader(imgresource,function(){
			cxt.drawImage(images.sprite,0,0,200,200);
		});
	}
};

function main1(){
	var obj = new Obj();
	obj.moveTo(1,2);
	obj.draw();
	//var _res = new Resource(snakeNum);

	//var _ticker = _res.getTicker().getPhysics();
	//_ticker.addEvent(snake0.userCtrl);
	//_ticker.addEvent(snake1.freewalk);
	//_ticker.addEvent(snake2.freewalk);
	//_ticker.start();
};

window.onload = main1;
