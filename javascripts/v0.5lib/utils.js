Collision = {};
Collision.circleCircle = function(sprite1,sprite2){
	var sx = sprite1.anchor.x;
	var sy = sprite1.anchor.y;
	var sr = sprite1.r;
	var dx = sprite2.anchor.x;
	var dy = sprite2.anchor.y;
	var dr = sprite2.r;
	var collision = false;
	var res = {};
	var distance = (sx-dx)*(sx-dx)+(sy-dy)*(sy-dy);
	if((sr+dr)*(sr+dr)>distance){
		collision = true;
		res.vector = new Vector2((sr+dr)-Math.abs(sx-dx),(sr+dr)-Math.abs(sy-dy));
	}
	res.collision = collision;
	return res;
};

Collision.circleEdge = function(sprite,t){
	var vector = sprite.anchor.addVNew(sprite.velocity.mulNew(t/1000));
	//var sx = sprite.anchor.x;
	//var sy = sprite.anchor.y;
	var r = sprite.r;
	var sx = vector.x;
	var sy = vector.y;
	var reduction = 0.95;

	var width = resource.world.width;
	var height = resource.world.height;
	var collision = false;
	// x direction collide
	if(sx-r<0||width-sx<r){
		collision = true;
		var vector = new Vector2().setV(sprite.velocity.negativeX());
		sprite.velocity.setV(vector);
		sprite.velocity.mulX(reduction);
	// y direction collide
	}else if(sy-r<0||height-sy<r){
		collision = true;
		var vector = new Vector2().setV(sprite.velocity.negativeY());
		sprite.velocity.setV(vector);
		sprite.velocity.mulY(reduction);
	}
	return collision;
};
