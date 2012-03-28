Animation = function(){
	//this.radianFix = Math.PI/180*215;
	this.radianFix = 0;
	this.cxt = document.getElementById("canvas").getContext("2d"); 
};

Animation.prototype.play = function(sprite){
	var config = sprite.config;
	var anchor = sprite.anchor;
	var velocity = sprite.velocity;
	var radian;
	if(velocity.x>0){
		radian = Math.atan(velocity.y/velocity.x);
	}else{
		radian = Math.atan(velocity.y/velocity.x)+Math.PI;
	}
	config[0] = resource.img["sprite3"];
	this.cxt.save();
	//rotate test
	this.cxt.translate(anchor.x,anchor.y);
	this.cxt.rotate(radian+this.radianFix);
	this.cxt.drawImage.apply(this.cxt,config);
	//this.cxt.drawImage(
	//		this.img["sprite3"],
	//		//_this.imgRegionLeft,
	//		//_this.imgRegionRight,
	//		//_this.imgRegionWidth,
	//		//_this.imgRegionHeight,
	//		//570,190,190,190,
	//		10*32,3*32,32,16,
	//		spriteLeft,
	//		spriteTop,
	//		spriteWidth,
	//		spriteHeight
	//		);
	this.cxt.restore();
};
