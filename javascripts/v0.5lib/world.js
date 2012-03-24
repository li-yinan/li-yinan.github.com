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

World.prototype.frameCtrl = function(t){
	this.cxt.clearRect(0,0,800,600);
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
		}
	}
};

