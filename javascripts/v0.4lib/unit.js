Unit = function(images){
	Sprite.call(this);
	var _this = this;
	this.img = images.sprite1;
	this.group = 0;
	this.attackR = 200;
	this.ATK = 13;
	this.DEF = 1;
	this.attackSpeed = 1000;
	this.life = 100;
	this.attack = function(unit){
		unit.life -= parseInt(_this.ATK/(unit.DEF*0.06+1));
		console.log("unit "+_this.No+" attack unit "+unit.No+", unit "+unit.No+"'s life is"+unit.life);
	};
	this.findEnemy = function(){
		var freq = ticker.getFreq();
		var times = parseInt(_this.attackSpeed/1000*freq);
		if(ticker.getCounter()%times!=0){
			return;
		}
		var list = _this.world.spriteList;
		var sx = _this.anchorX;
		var sy = _this.anchorY;
		var sr = _this.attackR;
		for(var i=0;i<list.length;i++){
			if(_this.group==list[i].group){
				continue;
			}
			var dx = list[i].anchorX;
			var dy = list[i].anchorY;
			var distance = Math.sqrt((sx-dx)*(sx-dx)+(sy-dy)*(sy-dy));
			if(distance<sr){
				_this.attack(list[i]);
			}
		}
	};
	this.spriteFrameCtrl = this.frameCtrl;
	this.frameCtrl = function(){
		//console.log("before spriteFrameCtrl");
		_this.spriteFrameCtrl();
		_this.findEnemy();
	};
	//call sperate img into sprite function
	this.init = function(){
		this.calRegionCoord(4,4);
	};
	this.init();
};
