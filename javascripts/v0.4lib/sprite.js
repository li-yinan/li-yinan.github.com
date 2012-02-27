Sprite = function(){
	// image of sprite
	this.img = undefined;
	// sprite direction
	this.direction = 0;
	// controll event source
	this.eventSource = "";
	// region of img
	this.spriteList = [];
	//current sprite
	this.currentSprite = 0;
	// animation duration
	this.duration = 500;
	//image region left
	this.imgRegionLeft = 0;
	//image region right 
	this.imgRegionRight = 0;
	//image region width 
	this.imgRegionWidth = 100;
	//image region height 
	this.imgRegionHeight = 100;
	//canvas
	this.canvas = document.getElementById("canvas"); 
	this.cxt = this.canvas.getContext("2d");
	//direction
	this.direction = 0;
	// collision R
	this.collisionR = 100;
	// move speed
	this.speed = 100;
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
	//z-index
	this.zIndex = 1;
	//if the sprite is moving
	this.moving = false;
	// whether the sprite is visible,related with collision
	this.visibility = true;
	// setInterval ptr
	this.timer = undefined;
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
		_this.destX = destX;
		_this.destY = destY;
		_this.moving = true;
	}

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
			return;
		}
		_this.anchorX = unit*(dx-sx)+sx;
		_this.anchorY = unit*(dy-sy)+sy;
		console.log("moveto override");
	};

	/**
	 * @brief rotato the sprite
	 *
	 * @return 
	 *
	 * @throw "pleaseoverwrite this function!"
	 */
	this.rotate = function(){
		throw("please overwrite this function!");
	};

	/**
	 * @brief set the region of sprite
	 *
	 * @return 
	 */
	this.setSpriteRegion = function(direction,i){
		if(_this.eventSource!="key"){
			_this.direction = direction;
		}
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
		if(_this.eventSource!="key"){
			var movex = Math.abs(dx-sx)>Math.abs(dy-sy)?true:false;
			if(!_this.moving){
				//sprite is stoped
				direction = 0;
			}else{
				//sprite move on x axis
				if(movex){
					if(dx>sx){
						direction = 2;//move to right
					}else{
						direction = 1;//move to left
					}
				}else{
				//sprite move on y axis
					if(dy>sy){
						direction = 0;//move to right
					}else{
						direction = 3;//move to left
					}
				}
			}
			if(direction != _this.direction){
				_this.setSpriteRegion(direction, _this.currentSprite);
			}
		}else{
			//event source is keyboard
		}
		//decide direction end
		var freq = ticker.getFreq();
		var times = parseInt(_this.duration/1000*freq);
		if(ticker.getCounter()%times==0){
			_this.setSpriteRegion(direction, _this.currentSprite+1);
		}
	};

	/**
	 * @brief draw the sprite
	 *
	 * @return 
	 *
	 */
	this.draw = function(){
		_this.cxt.clearRect(0,0,_this.canvas.width,_this.canvas.height);
		//draw collison circle
		_this.cxt.beginPath();
		_this.cxt.arc(_this.anchorX,_this.anchorY,_this.collisionR,0,Math.PI*2,true);
		_this.cxt.stroke();
		//draw collison circle end
		_this.cxt.drawImage(
			_this.img,
			_this.imgRegionLeft,
			_this.imgRegionRight,
			_this.imgRegionWidth,
			_this.imgRegionHeight,
			_this.anchorX-_this.collisionR*_this.scale,
			_this.anchorY-_this.imgRegionHeight*2*_this.collisionR/_this.imgRegionWidth*_this.scale,
			_this.collisionR*2*_this.scale,
			_this.imgRegionHeight*2*_this.collisionR/_this.imgRegionWidth*_this.scale
		);
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
	this.frameCtrl = function(){
		_this.switchSpriteRegion();
		_this.moveTo();
		_this.draw();
	};
};
