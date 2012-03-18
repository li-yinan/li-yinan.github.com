var Sprite = function(){
	this.anchor = new Vector2(0,0);
	this.dest = new Vector2(0,0);
	this.velocity = new Vector2(0,0);
	//this.speed = 400;
};

Sprite.prototype.move = function(t){
	//anchor.add(velocity.nomalize().mul(this.speed*t/1000));
	anchor.add(velocity.mul(t/1000));
};
