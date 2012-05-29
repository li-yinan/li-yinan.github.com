Unit = function(images){
	Sprite.call(this);
	var _this = this;
	this.img = images.sprite1;
	this.group = 0;
	this.attackR = 200;
	this.ATKUpper = 13;
	this.ATKLower = 1;
	this.DEF = 1;
	this.attackSpeed = 1000;
	this.life = 100;
	this.die = false;

	this.attack = function(unit){
		unit.life -= parseInt((_this.ATKLower+Math.random()*(_this.ATKUpper-_this.ATKLower))/(unit.DEF*0.06+1));
		if(unit.life<0){
			unit.die = true;
		}
		console.log("unit "+_this.No+" attack unit "+unit.No+", unit "+unit.No+"'s life is"+unit.life);
	};

	/**
	 * @brief find enemy
	 *
	 * @return 
	 */
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
		var enemys = [];
		for(var i=0;i<list.length;i++){
			if(_this.group==list[i].group){
				continue;
			}
			var dx = list[i].anchorX;
			var dy = list[i].anchorY;
			var distance = Math.sqrt((sx-dx)*(sx-dx)+(sy-dy)*(sy-dy));
			if(distance<sr){
				//_this.attack(list[i]);
				//effect1.setUnit(_this,list[i],(function(unit){_this.attack(unit)})(list[i]));
				//_this.world.addEffect(FtEffect,(function(unit){_this.attack(unit)})(list[i]),_this,list[i]);
				enemys.push(list[i]);
			}
		}
		if(enemys.length){
			var decidedEnemy = enemys[parseInt(Math.random()*enemys.length)];
			//_this.world.addEffect(FtEffect,(function(unit){_this.attack(unit)})(decidedEnemy),_this,decidedEnemy);
			_this.world.addEffect(FireEffect,_this.attack,_this,decidedEnemy);
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
