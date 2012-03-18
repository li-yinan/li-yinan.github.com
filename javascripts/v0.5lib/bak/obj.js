Obj1 = function(images){
	Unit.call(this,images);
	var _this = this;
	this.img = images.sprite1;
	this.ATKUpper = 13;
	this.ATKLower = 1;
	this.DEF = 20;
	this.attackR = 300;
	this.anchorX = Math.random()*800;
	this.anchorY = Math.random()*600;
	this.destX = this.anchorX;
	this.destY = this.anchorY;
	
	//call sperate img into sprite function
	this.init = function(){
		this.calRegionCoord(4,4);
	};
	this.init();
};

Obj2 = function(images){
	Unit.call(this,images);
	var _this = this;
	this.group = 1;
	this.img = images.sprite2;
	this.ATKUpper = 8;
	this.ATKLower = 1;
	this.DEF = 20;
	this.attackR = 200;
	this.anchorX = Math.random()*800;
	this.anchorY = Math.random()*600;
	this.destX = this.anchorX;
	this.destY = this.anchorY;
	
	//call sperate img into sprite function
	this.init = function(){
		this.calRegionCoord(4,4);
	};
	this.init();
};
