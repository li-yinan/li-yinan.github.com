World = function(){
	this.width = 800;
	this.height = 600;
	this.velocity =  new Vector2(0,100);
	this.spriteList = [];
	this.effectList = [];
	this.canvas = document.getElementById("canvas"); 
	this.cxt = this.canvas.getContext("2d");
	_this = this;
	resource.ticker.addTimeEvent(100,Number.MAX_VALUE,function(){
		_this.clearSprite();
	});
};

World.prototype.addEffect = function(sprite){
	sprite.type = 2;
	this.effectList.push(sprite);
	return sprite;
};

World.prototype.addSprite = function(sprite){
	sprite.type = 1;
	sprite.no = this.spriteList.length;
	this.spriteList.push(sprite);
	return sprite;
};

World.prototype.clearSprite = function(){
	var temp = [];
	for(var i=0;i<this.spriteList.length;i++){
		if(!this.spriteList[i].dead){
			temp.push(this.spriteList[i]);
		}
	}
	this.spriteList = temp;

	temp = [];
	for(var i=0;i<this.effectList.length;i++){
		if(!this.effectList[i].dead){
			temp.push(this.effectList[i]);
		}
	}
	this.effectList = temp;
};

World.prototype.frameCtrl = function(t){
	this.cxt.clearRect(0,0,this.width,this.height);
	//this.spriteList.sort(function(a,b){
	//	if(a.anchorY<b.anchorY){
	//		return -1;
	//	}else if(a.anchorY>b.anchorY){
	//		return 1;
	//	}else{
	//		return 0;
	//	}
	//});

	//collision controll
	var arr = this.spriteList.concat(this.effectList);
	for(var i=0;i<arr.length;i++){
		//add gravity
		arr[i].velocity.addV(this.velocity.mulNew(t/1000));
		Collision.circleEdge(arr[i],t);
		if(!arr[i].collidable){
			continue;
		}
		for(var j=0;j<arr.length;j++){
			if(i==j){
				continue;
			}
			if(!arr[j].collidable){
				continue;
			}
			if((arr[i].mask&arr[j].group)==0){
				continue;
			}
			Collision.circleCircle(arr[i],arr[j],t);
		}
	}
	//sprite
	for(var i=0;i<this.spriteList.length;i++){
		var sprite = this.spriteList[i];
		sprite.frameCtrl(t);
	}
	//effect
	for(var i=0;i<this.effectList.length;i++){
		var sprite = this.effectList[i];
		sprite.frameCtrl(t);
	}
	//collision controll
	//var arr = this.spriteList.concat(this.effectList);
	////for(var i=0;i<this.spriteList.length;i++){
	////	Collision.circleEdge(this.spriteList[i]);
	////}
	////for(var i=0;i<this.effectList.length;i++){
	////	Collision.circleEdge(this.effectList[i]);
	////	if(!this.effectList[i].collidable){
	////		continue;
	////	}
	////	for(var j=0;j<this.spriteList.length;j++){
	////		if(!this.spriteList[j].collidable){
	////			continue;
	////		}
	////		if((this.effectList[i].mask&this.spriteList[j].group)==0){
	////			continue;
	////		}
	////		Collision.circleCircle(this.effectList[i],this.spriteList[j],t);
	////	}
	////}
};

World.prototype.pointOnSprite = function(x,y){
	var distance = Number.MAX_VALUE;
	var sprite;
	for(var i=0;i<this.spriteList.length;i++){
		var sx = this.spriteList[i].anchor.x;
		var sy = this.spriteList[i].anchor.y;
		var sd = (sx-x)*(sx-x)+(sy-y)*(sy-y);
		if(sd<distance){
			distance=sd;
			sprite = this.spriteList[i];
		}
	}
	if(sprite&&distance<(sprite.shape.r+10)*(sprite.shape.r+10)){
		console.log("point on sprite");
		if(this.selectedSprite){
			this.selectedSprite.selected = false;
		}
		this.selectedSprite = sprite;
		sprite.selected = true;
		return sprite;
	}
	return undefined;
};

World.prototype.selectSpriteByKeyboard = function(no){
	for(var i=0;i<this.spriteList.length;i++){
		if(this.spriteList[i].no==no){
			if(this.selectedSprite){
				this.selectedSprite.selected = false;
			}
			this.selectedSprite = this.spriteList[i];
			this.spriteList[i].selected = true;
			break;
		}
	}
}
