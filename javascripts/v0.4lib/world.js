World = function(){
	this.spriteList = [];
	this.selectedSprite;
	this.sleep = false;
	var _this = this;
	this.addSprite = function(sprite){
		_this.spriteList.push(sprite);
	};
	this.removeSprite = function(i){
		_this.spriteList[i] = undefined; 
	};
	this.frameCtrl = function(){
		//do sprite clear
		//console.log("in world framectrl");
		_this.spriteList.sort(function(a,b){
			if(a.anchorY<b.anchorY){
				return -1;
			}else if(a.anchorY>b.anchorY){
				return 1;
			}else{
				return 0;
			}
		});
		for(var i=0;i<_this.spriteList.length;i++){
			if(_this.spriteList[i]&&(_this.spriteList[i].moving||!_this.sleep)){
				_this.spriteList[i].clear();
			}
		}
		//do sprite frameControll 
		for(var i=0;i<_this.spriteList.length;i++){
			if(_this.spriteList[i]&&(_this.spriteList[i].moving||!_this.sleep)){
				_this.spriteList[i].frameCtrl();
			}
		}
	};
	this.selectSprite = function(x,y){
		var distance = Number.MAX_VALUE;
		var sprite;
		for(var i=0;i<_this.spriteList.length;i++){
			var sx = _this.spriteList[i].anchorX;
			var sy = _this.spriteList[i].anchorY;
			var sd = (sx-x)*(sx-x)+(sy-y)*(sy-y);
			_this.spriteList[i].drawCollisionCircle = false;
			if(sd<distance){
				distance=sd;
				sprite = _this.spriteList[i];
			}
		}
		if(distance<(sprite.collisionR+10)*(sprite.collisionR+10)){
			_this.selectedSprite = sprite;
			sprite.drawCollisionCircle = true;
		}
		_this.selectedSprite.drawCollisionCircle = true;
	};
}
