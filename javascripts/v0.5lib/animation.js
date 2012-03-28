Animation = function(){
	this.img = null;
	this.radianFix = Math.PI/180*215;
	this.cxt = document.getElementById("canvas").getContext("2d"); 
};

Animation.prototype.loadImg = function(){
	var _this = this;
	var imgresource = {
		sprite1:"resource/spriteimg/012-Lancer04.png",
		sprite2:"resource/spriteimg/040-Mage08.png",
		world1:"resource/worldimg/011-PortTown01.jpg",
		effect1:"resource/effectimg/Sword2.png"
	};
	new ImgLoader(imgresource,function(images){
		_this.img = images;
	});
};

Animation.prototype.play = function(sprite){
	var r = sprite.r;
	var spriteLeft = -r;
	var spriteTop = -r;
	var spriteWidth = r*2;
	var spriteHeight = r*2;
	var anchor = sprite.anchor;
	var velocity = sprite.velocity;
	var radian;
	if(velocity.x>0){
		radian = Math.atan(velocity.y/velocity.x);
	}else{
		radian = Math.atan(velocity.y/velocity.x)+Math.PI;
	}
	this.cxt.save();
	//rotate test
	this.cxt.translate(anchor.x,anchor.y);
	this.cxt.rotate(radian+this.radianFix);
	this.cxt.drawImage(
			this.img["effect1"],
			//_this.imgRegionLeft,
			//_this.imgRegionRight,
			//_this.imgRegionWidth,
			//_this.imgRegionHeight,
			570,190,190,190,
			spriteLeft,
			spriteTop,
			spriteWidth,
			spriteHeight
			);
	this.cxt.restore();
};
