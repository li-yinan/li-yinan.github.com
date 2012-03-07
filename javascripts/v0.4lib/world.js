World = function(images){
	this.spriteList = [];

	this.top = 0;
	this.left = 0;

	this.containerHeight = 0;
	this.containerWidth = 0;

	this.selectedSprite;
	this.sleep = false;
	this.img = images.world1;
	this.canvas = document.getElementById("canvas");
	this.container = document.getElementById("container");
	this.cxt = this.canvas.getContext("2d");
	var _this = this;

	/**
	 * @brief 
	 *
	 * @param obj1 collide source
	 * @param obj2 be collided
	 *
	 * @return 
	 */
	this.collisionCallBack = function(obj1,obj2){
		//obj1.setDest(obj1.anchorX,obj1.anchorY);
		console.log("collisionCallBack ");
		//obj1.moving = false;
		//console.log(obj1);
		//console.log(obj2);
	};
	/**
	 * @brief detect collision on moving sprites
	 *
	 * @return 
	 */
	this.collision = function(callback){
		for(var i=0;i<_this.spriteList.length;i++){
			if(_this.spriteList[i]&&_this.spriteList[i].moving){
				var sx = _this.spriteList[i].anchorX;
				var sy = _this.spriteList[i].anchorY;
				var sr = _this.spriteList[i].collisionR;
				for(var j=0;j<_this.spriteList.length;j++){
					//if not self
					if(i!=j){
						var dx = _this.spriteList[j].anchorX;
						var dy = _this.spriteList[j].anchorY;
						var dr = _this.spriteList[j].collisionR;
						var distance = (sx-dx)*(sx-dx)+(sy-dy)*(sy-dy);
						//if collide
						if(distance<(sr+dr)*(sr+dr)){
							callback(_this.spriteList[i],_this.spriteList[j]);
						}
					}
				}
			}
		}
	};
	/**
	 * @brief add sprite
	 *
	 * @param sprite
	 *
	 * @return 
	 */
	this.addSprite = function(sprite){
		sprite.world = _this;
		_this.spriteList.push(sprite);
	};

	/**
	 * @brief called by ticker
	 *
	 * @return 
	 */
	this.frameCtrl = function(){
		//_this.collision(_this.collisionCallBack);
		//do sprite clear
		//sort the sprite list by anchorY 
		_this.spriteList.sort(function(a,b){
			if(a.anchorY<b.anchorY){
				return -1;
			}else if(a.anchorY>b.anchorY){
				return 1;
			}else{
				return 0;
			}
		});

		//save state, ready to clip, then call this.draw to cover the sprite pic
		_this.cxt.save();
		//clip sprite
		_this.cxt.beginPath();
		for(var i=0;i<_this.spriteList.length;i++){
			if(_this.spriteList[i]&&(_this.spriteList[i].moving||!_this.sleep)){
				//_this.spriteList[i].clear();
				var region = _this.spriteList[i].getClearRegion();
				_this.cxt.rect(region.left,region.top,region.width,region.height);
			}
		}
		_this.cxt.closePath();
		_this.cxt.clip();
		//add world render code,now test with draw a rectagle
		//_this.cxt.fillStyle = "#999999";
		//_this.cxt.fillRect(0,0,_this.canvas.width,_this.canvas.height);
		_this.draw();
		//clip sprite end
		//restore state
		_this.cxt.restore();
		//do sprite frameControll 
		for(var i=0;i<_this.spriteList.length;i++){
			if(_this.spriteList[i]&&(_this.spriteList[i].moving||!_this.sleep)){
				_this.spriteList[i].frameCtrl();
			}
		}
	};

	/**
	 * @brief select sprite nearest of (x,y) in 10 pixel
	 *
	 * @param x
	 * @param y
	 *
	 * @return 
	 */
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

	/**
	 * @brief roll map
	 *
	 * @param relateX offset X of prev coordinate
	 * @param relateY offset Y of prev coordinate
	 *
	 * @return 
	 */
	this.rollMap = function(relateX,relateY){
		if(_this.top+relateY>0||_this.top+relateY<_this.containerHeight-_this.canvas.height){
			return;
		}
		if(_this.left+relateX>0||_this.left+relateX<_this.containerWidth-_this.canvas.width){
			return;
		}
		_this.top += relateY;
		_this.left += relateX;
		_this.canvas.style.top = _this.top+"px";
		_this.canvas.style.left = _this.left+"px";
		/*
		_this.cxt.save();
		_this.cxt.rect(0,0,_this.canvas.width,_this.canvas.height);
		_this.cxt.clip();
		if(_this.imgRegionLeft+relateX<0||_this.imgRegionLeft+relateX+_this.imgRegionWidth>_this.img.width){
			return;
		}
		if(_this.imgRegionTop+relateY<0||_this.imgRegionTop+relateY+_this.imgRegionHeight>_this.img.height){
			return;
		}
		_this.imgRegionLeft += relateX;
		_this.imgRegionTop += relateY;
		_this.cxt.drawImage(
			_this.img,
			_this.imgRegionLeft,
			_this.imgRegionTop,
			_this.imgRegionWidth,
			_this.imgRegionHeight,
			0,0,_this.canvas.width,_this.canvas.height
		);
		_this.cxt.restore();
		for(var i=0;i<_this.spriteList.length;i++){
			_this.spriteList[i].anchorX -= relateX;
			_this.spriteList[i].anchorY -= relateY;
			_this.spriteList[i].destX -= relateX;
			_this.spriteList[i].destY -= relateY;
		}
		*/
	};
	/**
	 * @brief render background
	 *
	 * @return 
	 */
	this.draw = function(){
		_this.cxt.drawImage(_this.img,0,0,_this.canvas.width,_this.canvas.height);
		//_this.cxt.drawImage(
		//	_this.img,
		//	_this.imgRegionLeft,
		//	_this.imgRegionTop,
		//	_this.imgRegionWidth,
		//	_this.imgRegionHeight,
		//	0,0,_this.canvas.width,_this.canvas.height
		//);
		//_this.cxt.fillStyle = "#999999";
		//_this.cxt.fillRect(0,0,_this.canvas.width,_this.canvas.height);
	};
	//call once to draw background 
	/**
	 * @brief init ,call once on start
	 *
	 * @return 
	 */
	this.init = function(){
		//_this.
		this.containerHeight = parseInt(document.defaultView.getComputedStyle(_this.container, null)["height"]);
		this.containerWidth = parseInt(document.defaultView.getComputedStyle(_this.container, null)["width"]);
		_this.draw();
	};
	this.init();
}
