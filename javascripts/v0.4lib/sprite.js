Sprite = function(){
	// image of sprite
	this.img = undefined;
	// alpha
	this.alpha = 1;
	// draw sprite offset
	this.offset = 0;
	// sprite direction
	this.direction = 0;
	// sprite radian
	this.radian = 0;
	// region of img
	this.spriteList = [];
	//current sprite
	this.currentSprite = 0;
	//image region left
	this.imgRegionLeft = 0;
	//image region right 
	this.imgRegionRight = 0;
	//image region width 
	this.imgRegionWidth = 100;
	//image region height 
	this.imgRegionHeight = 100;
	// whether draw the collision circle
	this.drawCollisionCircle = false;
	//canvas cxt
	this.cxt = document.getElementById("canvas").getContext("2d");
	//direction
	this.direction = 0;
	// collision R
	this.collisionR = 100;
	// move speed
	this.speed = 100;
	// animation duration
	this.duration = 500;
	//scale default = 1
	this.scale = 1;
	// destination X
	this.destX = 0;
	// destination Y
	this.destY = 0;
	// anchor X
	this.anchorX = 0;
	// anchor Y
	this.anchorY = 0;
	// prev anchor X
	this.prevX = 0;
	// prev anchor Y
	this.prevY = 0;
	//boundary X
	this.boundaryX = 800;
	//boundary Y
	this.boundaryY = 600;
	//z-index
	this.zIndex = 1;
	//if the sprite is moving
	this.moving = false;
	// if the sprite is movable
	this.movable = true;
	// whether the sprite is visible,related with collision
	this.visibility = true;
	//this pointer
	var _this = this;

	/**
	 * @brief set destination coordination
	 *
	 * @param destX
	 * @param destY
	 *
	 * @return 
	 */
	this.setDest = function(destX,destY){
		if(destX<0){ destX = 0; }
		if(destY<0){ destY = 0; }
		if(destX>_this.boundaryX){ destX = _this.boundaryX; }
		if(destY>_this.boundaryY){ destY = _this.boundaryY; }
		_this.destX = destX;
		_this.destY = destY;
		_this.moving = true;
	}

	/**
	 * @brief before move,after calculate the next coordination
	 *
	 * @param nx  next X
	 * @param ny  next Y
	 *
	 * @return 
	 */
	this.beforeMove = function(next){
		var collide = false;
		var sr = _this.collisionR;
		for(var i=0;i<_this.world.spriteList.length;i++){
			var dx = _this.world.spriteList[i].anchorX;
			var dy = _this.world.spriteList[i].anchorY;
			var dr = _this.world.spriteList[i].collisionR;
			//if is self continue
			if(_this.anchorX==dx&&_this.anchorY==dy){
				continue;
			}
			var distance = (next.x-dx)*(next.x-dx)+(next.y-dy)*(next.y-dy);
			//if collide
			var unit = (sr+dr)*(sr+dr)/distance;
			if(unit>1){
				collide = true;
				next.x = (next.x-dx)*unit+dx;
				next.y = (next.y-dy)*unit+dy;
			}
		}
		//if(collide){
		//	//next.x = _this.anchorX;
		//	//next.y = _this.anchorY;
		//	_this.moving = false;
		//	_this.setSpriteRegion(_this.direction, 0);
		//}
	};

	/**
	 * @brief move to destination coordination
	 *
	 * @param destX
	 * @param destY
	 *
	 * @return 
	 *
	 */
	this.moveTo = function(){
		if(!_this.moving){
			return;
		}
		var sx = _this.anchorX;
		var sy = _this.anchorY;
		var dx = _this.destX;
		var dy = _this.destY;
		var freq = ticker.getFreq();
		var unit = _this.speed/Math.sqrt((dx-sx)*(dx-sx)+(dy-sy)*(dy-sy))/freq;
		//if abs(unit*(dx-sx))>abs(dx-sx) then stop
		//if unit>1 then stop
		if(unit>1){
			//ticker.clearEvent(moveptr);
			_this.anchorX = dx;
			_this.anchorY = dy;
			_this.moving = false;
			_this.setSpriteRegion(_this.direction, 0);
			//_this.draw();
			return;
		}
		var next = {};
		next.x = unit*(dx-sx)+sx;
		next.y = unit*(dy-sy)+sy;
		_this.beforeMove(next);
		_this.prevX = _this.anchorX;
		_this.prevY = _this.anchorY;
		_this.anchorX = next.x;
		_this.anchorY = next.y;
		//console.log("moveto override");
	};

	/**
	 * @brief set the region of sprite
	 *
	 * @return 
	 */
	this.setSpriteRegion = function(direction,i){
		_this.direction = direction;
		if(i>=_this.spriteList[_this.direction].length){
			i = 0;
		}
		_this.imgRegionLeft = _this.spriteList[_this.direction][i][0];
		_this.imgRegionRight = _this.spriteList[_this.direction][i][1];
		_this.imgRegionWidth = _this.spriteList[_this.direction][i][2];
		_this.imgRegionHeight = _this.spriteList[_this.direction][i][3];
		_this.currentSprite = i;
	};

	/**
	 * @brief calculate the direction,and set the sprite correct sprite img
	 *
	 * @return 
	 */
	this.switchSpriteRegion = function(){
		var sx = _this.anchorX;
		var sy = _this.anchorY;
		var dx = _this.destX;
		var dy = _this.destY;
		var direction = undefined;
		//decide direction
		// if event source is keyboard,direction = input arrow
		// else calulate the direction 
		var movex = Math.abs(dx-sx)>Math.abs(dy-sy)?true:false;
		if(!_this.moving){
			//sprite is stoped
			direction = _this.direction;
		}else{
			//sprite move on x axis
			if(movex){
				if(dx>sx){
					direction = 2;//move right
				}else{
					direction = 1;//move left
				}
			}else{
			//sprite move on y axis
				if(dy>sy){
					direction = 0;//move down 
				}else{
					direction = 3;//move up 
				}
			}
		}
		// if direction changed ,call function immediatly
		if(direction != _this.direction){
			if(_this.movable){
				_this.setSpriteRegion(direction, _this.currentSprite);
			}
		}
		//decide direction end
		var freq = ticker.getFreq();
		var times = parseInt(_this.duration/1000*freq);
		if(ticker.getCounter()%times==0){
			if(_this.movable){
				if(_this.moving){
					_this.setSpriteRegion(direction, _this.currentSprite+1);
				}else{
					_this.setSpriteRegion(direction, 0);
				}
			}else{
				_this.direction = 0;
				_this.setSpriteRegion(0, _this.currentSprite+1);
			}
		}
	};
	this.getClearRegion = function(){
		var ret = {};
		ret.left = _this.anchorX-_this.collisionR*_this.scale-1;
		ret.top = _this.anchorY-_this.imgRegionHeight*_this.collisionR/_this.imgRegionWidth*_this.scale+_this.offset-1;
		ret.width = _this.collisionR*2*_this.scale+2;
		if(_this.drawCollisionCircle){
			ret.height = _this.imgRegionHeight*2*_this.collisionR/_this.imgRegionWidth*_this.scale+_this.offset+2;
		}else{
			ret.height = _this.imgRegionHeight*2*_this.collisionR/_this.imgRegionWidth*_this.scale;
		}
		return ret;
	};

	/**
	 * @brief clear sprite draw
	 *
	 * @return 
	 */
	this.clear = function(){
		var spriteLeft = -_this.collisionR*_this.scale;
		var spriteTop = -_this.imgRegionHeight*_this.collisionR/_this.imgRegionWidth*_this.scale+_this.offset;
		var spriteWidth = _this.collisionR*2*_this.scale;
		var spriteHeight = _this.imgRegionHeight*2*_this.collisionR/_this.imgRegionWidth*_this.scale;
		_this.cxt.save();
		_this.cxt.translate(_this.anchorX,_this.anchorY);
		_this.cxt.rotate(_this.radian);
		if(_this.drawCollisionCircle){
			// clear screen
			_this.cxt.clearRect(spriteLeft-1,spriteTop-1,spriteWidth+2,spriteHeight+_this.offset+2);
		}else{
			// clear screen
			_this.cxt.clearRect(spriteLeft-1,spriteTop-1,spriteWidth+2,spriteHeight+2);
		}
		_this.cxt.restore();
	}
	/**
	 * @brief draw the sprite
	 *
	 * @return 
	 *
	 */
	this.draw = function(){
		var spriteLeft = -_this.collisionR*_this.scale;
		var spriteTop = -_this.imgRegionHeight*_this.collisionR/_this.imgRegionWidth*_this.scale+_this.offset;
		var spriteWidth = _this.collisionR*2*_this.scale;
		var spriteHeight = _this.imgRegionHeight*2*_this.collisionR/_this.imgRegionWidth*_this.scale;

		//set alpha, reset to 1 at the end of this function
		_this.cxt.globalAlpha = _this.alpha;
		//draw Collision Circle
		if(_this.drawCollisionCircle){
			//draw collison circle
			_this.cxt.save();
			_this.cxt.beginPath();
			_this.cxt.arc(_this.anchorX,_this.anchorY,_this.collisionR,0,Math.PI*2,true);
			_this.cxt.closePath();
			_this.cxt.clip();
			_this.cxt.stroke();
			_this.cxt.restore();
			//draw collison circle end
		}

		_this.cxt.save();
		//rotate test
		_this.cxt.translate(_this.anchorX,_this.anchorY);
		_this.cxt.rotate(_this.radian);
		//rotate test end
		//clip screen
		_this.cxt.beginPath();
		//_this.cxt.rect(spriteLeft,spriteTop,spriteWidth,spriteHeight);
		_this.cxt.rect(spriteLeft,spriteTop,spriteWidth,spriteHeight);
		_this.cxt.closePath();
		_this.cxt.clip();

		_this.cxt.drawImage(
			_this.img,
			_this.imgRegionLeft,
			_this.imgRegionRight,
			_this.imgRegionWidth,
			_this.imgRegionHeight,
			spriteLeft,
			spriteTop,
			spriteWidth,
			spriteHeight
		);
		_this.cxt.restore();
		//restore alpha
		_this.cxt.globalAlpha = 1;
	};

	/**
	 * @brief seperate img into pieces of sprite
	 *
	 * @param numX x axis sprite numbers
	 * @param numY y axis sprite numbers
	 *
	 * @return 
	 */
	this.calRegionCoord = function(numX,numY){
		var regionWidth = _this.img.width/numX;
		var regionHeight = _this.img.height/numY;
		for(var j=0;j<numY;j++){
			//define direction array
			_this.spriteList[j] = [];
			for(var i=0;i<numX;i++){
				_this.spriteList[j].push([i*regionWidth,j*regionHeight,regionWidth,regionHeight]);
			}
		}
	};

	/**
	 * @brief called by ticker 
	 *
	 * @return 
	 */
	//var lastState = true;
	this.frameCtrl = function(){
		//if movable sprite is not in moving state,and is not the first frame turn into unmoving from moving state,then sleep
		//if((!_this.moving)&&_this.movable&&(lastState==_this.moving)){
		//	lastState = _this.moving;
		//	return;
		//}else if((!_this.moving)&&_this.movable&&(lastState!=_this.moving)){
		//	//if sprite turn into unmoving state,then go on moving once to set the animation correct
		//	//set animation in stop state
		//	_this.setSpriteRegion(_this.direction, 0);
		//	_this.clear();
		//	_this.draw();
		//	lastState = _this.moving;
		//	_this.render = false;
		//	return;
		//}
		//lastState = _this.moving;

		//_this.clear();
		_this.switchSpriteRegion();
		if(_this.movable){
			_this.moveTo();
		}
		_this.draw();
	};
};
