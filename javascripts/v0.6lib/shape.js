Shape = {};

Shape.Circle = function(r){
	this.r = r;
};

Shape.Circle.prototype.draw = function(sprite){
	var cxt = sprite.cxt;
	var anchor = sprite.anchor;
	cxt.beginPath();
	cxt.arc(anchor.x,anchor.y,this.r,0,Math.PI*2,true);
	cxt.closePath();
	cxt.stroke();
};

Shape.AABB = function(){
};

Shape.OBB = function(){
};
