Obj1 = function(images){
	Sprite.call(this);
	var _this = this;
	this.img = images.sprite1;
	this.anchorX = Math.random()*800;
	this.anchorY = Math.random()*600;
	this.destX = this.anchorX;
	this.destY = this.anchorY;
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
	this.init = function(){
		this.calRegionCoord(4,4);
	};
	this.init();
};

Obj2 = function(images){
	Sprite.call(this);
	var _this = this;
	this.img = images.sprite2;
	//this.selectable = false;
	this.anchorX = Math.random()*800;
	this.anchorY = Math.random()*600;
	this.destX = this.anchorX;
	this.destY = this.anchorY;
	this.speed = 300;
	this.collisionR = 16;
	this.duration = 100;
	this.drawCollisionCircle = false;
	
	//call sperate img into sprite function
	this.calRegionCoord(4,4);
};
