Algorithm = {};
Algorithm.calElasticSpeed = function(sprite1,sprite2){
	var vector1 = sprite1.anchor;
	var vector2 = sprite2.anchor;
	var sx = vector1.x;
	var sy = vector1.y;
	var dx = vector2.x;
	var dy = vector2.y;
	var m1 = sprite1.mass;
	var m2 = sprite2.mass;
	//var sqrtdist = Math.sqrt(distance);
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
};

Algorithm.calInelasticSpeed = function(sprite1,sprite2){
	var m1 = sprite1.mass;
	var m2 = sprite2.mass;
	//var sqrtdist = Math.sqrt(distance);
	var vct1 = sprite1.velocity.copy();
	var vct2 = sprite2.velocity.copy();
	vct = vct1.mul(m1).addV(vct2.mul(m2)).mul(1/(m1+m2));
	sprite1.velocity.setV(vct);
	sprite2.velocity.setV(vct);
};

Collision = {};
Collision.circleCircle = function(sprite1,sprite2,t){
	//var vector1 = sprite1.anchor.addVNew(sprite1.velocity.mulNew(t/1000));
	//var vector2 = sprite2.anchor.addVNew(sprite2.velocity.mulNew(t/1000));
	var vector1 = sprite1.anchor;
	var vector2 = sprite2.anchor;
	var sx = vector1.x;
	var sy = vector1.y;
	var sr = sprite1.shape.r;
	var dx = vector2.x;
	var dy = vector2.y;
	var dr = sprite2.shape.r;
	var collision = false;
	var distance = (sx-dx)*(sx-dx)+(sy-dy)*(sy-dy);
	if((sr+dr)*(sr+dr)>distance){
		collision = true;
		Algorithm.calElasticSpeed(sprite1,sprite2);
		//Algorithm.calInelasticSpeed(sprite1,sprite2);
		console.log("collision");
	}
	return collision;
};

Collision.circleEdge = function(sprite){
	//var vector = sprite.anchor.addVNew(sprite.velocity.mulNew(t/1000));
	var vector = sprite.anchor;
	var r = sprite.shape.r;
	var x = vector.x;
	var y = vector.y;
	var reduction = 0.95;
	

	var width = resource.world.width;
	var height = resource.world.height;
	var collision = false;
	// left collide
	if(x-r<0){
		collision = true;
		sprite.velocity.negativeX();
		sprite.velocity.mulX(reduction);
	// right collide
	} else if(width-x<r){
		collision = true;
		sprite.velocity.negativeX();
		sprite.velocity.mulX(reduction);
	// up collide
	}else if(y-r<0){
	// down collide
	}else if(height-y<r){
		collision = true;
		//sprite.velocity.setZero();
		sprite.setSleep();
		if(sprite.type == 2){
			sprite.collidable = false;
			sprite.condition = 6;
		}
		//sprite.velocity.negativeY();
		//sprite.velocity.mulY(reduction);
	}
	return collision;
};
