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

Sprite.prototype.draw = function(){
	this.shape.draw(this);
	//if(this.selected){
	//	this.cxt.beginPath();
	//	this.cxt.arc(this.anchor.x,this.anchor.y,10,0,Math.PI*2,true);
	//	this.cxt.closePath();
	//	this.cxt.stroke();
	//}
};

Sprite.prototype.frameCtrl = function(t){
	this.move(t);
	//this.draw();
};

Sprite.prototype.move = function(t){
	this.anchor.addV(this.velocity.mulNew(t/1000));
	//this.anchor.add(this.velocity.mulNew(t/1000).x,0);
};

Sprite.prototype.doAttack = function(){
	var _this = this;
	// if attacking then do nothing
	// prevent lose ptr
	if(this.ptr){
		return;
	}
	this.ptr = resource.ticker.addTimeEvent(2000,Number.MAX_VALUE,function(){
		resource.ticker.addTimeEvent(200,3,function(){
			var effect = new Sprite();
			effect.anchor.set(_this.anchor.x,_this.anchor.y-5);
			effect.velocity.set(100+Math.random()*50,-100+Math.random()*50);
			effect.velocity.addV(_this.velocity);
			effect.group = 2;
			effect.mask = 4+8+16+32+64+128;
			resource.world.addEffect(effect);
			//_this.stopAttack();
		});
	});
};
Sprite.prototype.stopAttack = function(){
	if(this.ptr){
		resource.ticker.removeTimeEvent(this.ptr);
		this.ptr = 0;
	}
};
