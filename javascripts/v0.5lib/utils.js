Collision = {};
Collision.circleCircle = function(sprite1,sprite2,t){
	//var vector1 = sprite1.anchor.addVNew(sprite1.velocity.mulNew(t/1000));
	//var vector2 = sprite2.anchor.addVNew(sprite2.velocity.mulNew(t/1000));
	var vector1 = sprite1.anchor;
	var vector2 = sprite2.anchor;
	var sx = vector1.x;
	var sy = vector1.y;
	var sr = sprite1.r;
	var dx = vector2.x;
	var dy = vector2.y;
	var dr = sprite2.r;
	var m1 = sprite1.mass;
	var m2 = sprite2.mass;
	var collision = false;
	var distance = (sx-dx)*(sx-dx)+(sy-dy)*(sy-dy);
	//if((sr+dr)*(sr+dr)>distance){
	//	collision = true;
	//	var sqrtdist = Math.sqrt(distance);
	//	var overlap = sr+dr-sqrtdist;
	//	var vct1 = sprite2.velocity.copy();
	//	var vct2 = sprite1.velocity.copy();
	//	vct1.addV(vct2.negativeNew().mul(sr/(sr+dr)*(overlap/sqrtdist)));
	//	vct2.addV(vct1.negativeNew().mul(dr/(sr+dr)*(overlap/sqrtdist)));
	//	sprite1.velocity.setV(vct1);
	//	sprite2.velocity.setV(vct2);
	//	console.log("collision");
	//}
	if((sr+dr)*(sr+dr)>distance){
		collision = true;
		var sqrtdist = Math.sqrt(distance);
		var vct1 = sprite1.velocity.copy();
		var vct2 = sprite2.velocity.copy();
		vct = vct1.subVNew(vct2);
		sprite1.velocity.setV(
			vct1.mulNew(m1-m2)
			.addV( vct2.mulNew(m2*2))
			.mul(1/(m1+m2))
		);
		sprite2.velocity.setV(
			vct1.mulNew(m1*2)
			.addV( vct2.mulNew(m2-m1))
			.mul(1/(m1+m2))
		);
		//vct1.addV(vct.mulNew((m1-m2)/(m1+m2)));
		//vct2.addV(vct.mulNew((m1*2)/(m1+m2)));
		//sprite1.velocity.setV(vct1);
		//sprite2.velocity.setV(vct2);
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
		sprite.velocity.mulX(reduction);
	// y direction collide
	}else if(sy-r<0||height-sy<r){
		collision = true;
		sprite.velocity.negativeY();
		//var vector = new Vector2().setV(sprite.velocity.negativeY());
		//sprite.velocity.setZeroY();
		sprite.velocity.mulY(reduction);
	}
	return collision;
};
