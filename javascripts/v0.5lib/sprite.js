var Sprite = function(){
	this.anchor = new Vector2(40,30);
	this.dest = new Vector2(0,0);
	this.velocity = new Vector2(10,0);
	this.mass = 400;
	this.canvas = document.getElementById("canvas"); 
	this.cxt = this.canvas.getContext("2d");
	this.cxt.transform(10,0,0,10,0,0);
};

Sprite.prototype.move = function(t){
	this.anchor.addV(this.velocity.mulNew(t/1000));
};

Sprite.prototype.draw = function(){
	this.cxt.clearRect(0,0,80,60);
	this.cxt.beginPath();
	this.cxt.arc(this.anchor.x,this.anchor.y,1,0,Math.PI*2,true);
	this.cxt.closePath();
	this.cxt.stroke();
};
