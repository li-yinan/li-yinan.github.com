World = function(){
	this.width = 800;
	this.height = 600;
	this.velocity =  new Vector2(0,100);
	this.spriteList = [];
	this.canvas = document.getElementById("canvas"); 
	this.cxt = this.canvas.getContext("2d");
};

World.prototype.addSprite = function(sprite){
	sprite.no = this.spriteList.length;
	this.spriteList.push(sprite);
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
	if(distance<(sprite.r+10)*(sprite.r+10)){
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

World.prototype.frameCtrl = function(t){
	this.cxt.clearRect(0,0,this.width,this.height);
	this.spriteList.sort(function(a,b){
		if(a.anchorY<b.anchorY){
			return -1;
		}else if(a.anchorY>b.anchorY){
			return 1;
		}else{
			return 0;
		}
	});
	for(var i=0;i<this.spriteList.length;i++){
		var sprite = this.spriteList[i];
		sprite.velocity.addV(this.velocity.mulNew(t/1000));
		sprite.frameCtrl(t);
	}
	//collision controll
	for(var i=0;i<this.spriteList.length;i++){
		for(var j=0;j<i;j++){
			Collision.circleCircle(this.spriteList[i],this.spriteList[j],t);
			//console.log("sprite "+i+" and sprite"+j);
		}
	}
};
