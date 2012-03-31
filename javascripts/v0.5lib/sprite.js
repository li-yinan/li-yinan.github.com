var Sprite = function(){
	this.config = [resource.img.sprite3,320,96,32,16,-16,-8,32,16];
	this.no = 0;
	this.state = 1;
	this.condition = 1;
	this.shape = new Shape.Circle(16);
	this.selected = false;
	this.collidable = true;
	this.group = 1;
	//this.mask = 1+2+4+8+16+32+64+128;
	this.mask = 0;
	this.anchor = new Vector2(Math.random()*(800-this.shape.r*2)+this.shape.r,(600-this.shape.r*2)+this.shape.r);
	this.dest = new Vector2(0,0);
	this.velocity = new Vector2(0,0);
	this.mass = 100+Math.random()*300;
	this.canvas = document.getElementById("canvas"); 
	this.cxt = this.canvas.getContext("2d");
	//this.cxt.transform(10,0,0,10,0,0);
};

Sprite.prototype.doAttack = function(){
	var _this = this;
	// if attacking then do nothing
	// prevent lose ptr
	if(this.ptr){
		return;
	}
	this.ptr = resource.ticker.addTimeEvent(2000,Number.MAX_VALUE,function(){
		if(_this.state!=3){
			_this.stopAttack();
			return;
		}
		resource.ticker.addTimeEvent(200,3,function(){
			var effect = new Sprite();
			effect.anchor.set(_this.anchor.x,_this.anchor.y-5);
			effect.velocity.set(100+Math.random()*50,-100+Math.random()*50);
			effect.velocity.addV(_this.velocity);
			effect.state = 2;
			effect.group = 2;
			effect.mask = 4+8+16+32+64+128;
			resource.world.addEffect(effect);
			//_this.stopAttack();
		});
	});
};

Sprite.prototype.draw = function(){
	this.shape.draw(this);
	//if(this.selected){
	//	this.cxt.beginPath();
	//	this.cxt.arc(this.anchor.x,this.anchor.y,10,0,Math.PI*2,true);
	//	this.cxt.closePath();
	//	this.cxt.stroke();
	//}
};
Sprite.prototype.revive = function(){
	if(this.deathptr){
		resource.ticker.removeTimeEvent(this.deathptr);
		this.deathptr = 0;
	}
}

Sprite.prototype.frameCtrl = function(t){
	switch(this.state){
		case 1: //stop
			break;
		case 2: //moving
			this.move(t);
			break;
		case 3: //attacking
			this.doAttack();
			this.move(t);
			break;
		case 4: //negative effect
			break;
		case 5: //dead
			if(this.type==1){
				var _this = this;
				this.condition = 6;
				this.deathptr = resource.ticker.addDelayTimeEvent(3000,1,function(){
					if(_this){
						_this.dead = true;
					}
				});
			}else{
				this.dead = true;
			}
			//do nothing here
			//deleted in world.js,clearSprite function
	}
	resource.stateMachine.transfer(this);
	resource.animation.play(this);
	//this.draw();
};

Sprite.prototype.move = function(t){
	var v = this.velocity.mulNew(t/1000);

	if(v.equalZero()){
		this.condition = 2;//stop
		this.velocity.setZero();
		return;
	}
	this.anchor.addV(v);
	//this.anchor.add(this.velocity.mulNew(t/1000).x,0);
};

Sprite.prototype.stopAttack = function(){
	if(this.ptr){
		resource.ticker.removeTimeEvent(this.ptr);
		this.ptr = 0;
	}
};
