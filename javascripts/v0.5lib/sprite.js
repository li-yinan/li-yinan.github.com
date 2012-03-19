var Sprite = function(){
	this.anchor = new Vector2(400,300);
	this.dest = new Vector2(0,0);
	this.velocity = new Vector2(100,100);
	this.mass = 400;
	this.canvas = document.getElementById("canvas"); 
	this.cxt = this.canvas.getContext("2d");
};

Sprite.prototype.move = function(t){
	var ratio = 1000;
	var rand = new Vector2(ratio*Math.random()-500,ratio*Math.random()-500);
	//var newV = this.velocity.addVNew(rand);
	this.anchor.addV(rand.mul(t/1000));
};

Sprite.prototype.draw = function(t){
	this.cxt.clearRect(0,0,800,600);
	this.cxt.beginPath();
	this.cxt.arc(this.anchor.x,this.anchor.y,10,0,Math.PI*2,true);
	this.cxt.closePath();
	this.cxt.stroke();
};
