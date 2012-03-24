Collision = {};
Collision.circleCircle = function(sprite1,sprite2,t){
	var vector1 = sprite1.anchor.addVNew(sprite1.velocity.mulNew(t/1000));
	var vector2 = sprite2.anchor.addVNew(sprite2.velocity.mulNew(t/1000));
	var sx = vector1.x;
	var sy = vector1.y;
	var sr = sprite1.r;
	var dx = vector2.x;
	var dy = vector2.y;
	var dr = sprite2.r;
	var collision = false;
	var distance = (sx-dx)*(sx-dx)+(sy-dy)*(sy-dy);
	if((sr+dr)*(sr+dr)>distance){
		collision = true;
		var vct1 = sprite2.velocity.copy();
		var vct2 = sprite1.velocity.copy();
		sprite1.velocity.setV(vct1);
		sprite2.velocity.setV(vct2);
		console.log("collision");
	}
	return collision;
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
		sprite.velocity.negativeX();
		//var vector = new Vector2().setV(sprite.velocity.negativeX());
		//sprite.velocity.setV(vector);
		sprite.velocity.mulX(reduction);
	// y direction collide
	}else if(sy-r<0||height-sy<r){
		collision = true;
		sprite.velocity.negativeY();
		//var vector = new Vector2().setV(sprite.velocity.negativeY());
		//sprite.velocity.setV(vector);
		sprite.velocity.mulY(reduction);
	}
	return collision;
};
