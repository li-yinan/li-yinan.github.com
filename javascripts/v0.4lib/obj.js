Obj1 = function(images){
	Sprite.call(this);
	var _this = this;
	this.img = images.sprite1;
	this.anchorX = 400;
	this.anchorY = 300;
	this.destX = 400;
	this.destY = 300;
	this.speed = 200;
	this.collisionR = 16;
	this.duration = 100;
	this.drawCollisionCircle = false;
	//this.offset = -20;
	//this.scale = 1;
	//this.radian = Math.PI*2/2;
	//this.alpha = 0.5;
	//this.movable = false;
	
	//call sperate img into sprite function
	this.calRegionCoord(4,4);
};

Obj2 = function(images){
	Sprite.call(this);
	var _this = this;
	this.img = images.sprite2;
	this.anchorX = 200;
	this.anchorY = 100;
	this.destX = 200;
	this.destY = 100;
	this.speed = 300;
	this.collisionR = 16;
	this.duration = 100;
	this.drawCollisionCircle = false;
	
	//call sperate img into sprite function
	this.calRegionCoord(4,4);
};
