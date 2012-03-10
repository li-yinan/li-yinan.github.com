FtEffect = function(images,callback,unit1,unit2){
	Effect.call(this);
	var _this = this;
	this.img = images.effect1;
	this.radian = Math.PI/180*135;
	//this.img = images.sprite1;
	
	//call sperate img into sprite function
	this.init = function(){
		this.calRegionCoord(5,3);
		//this.calDuration();
		//this.calRegionCoord(4,4);
		this.setUnit(unit1,unit2,callback);
	};
	this.init();
};
