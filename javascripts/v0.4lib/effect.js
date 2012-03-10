Effect = function(){
	this.img = undefined;
	//world
	this.world = undefined;
	// whether effect is the end
	this.end = true;
	// alpha
	this.alpha = 1;
	// effect from unit1
	this.fromUnit = undefined;
	// effect to unit2
	this.toUnit = undefined;
	// draw sprite offset
	this.offset = 0;
	// sprite radian
	//this.radian = 0;
	this.radian = 0;
	//this.radian = 0;
	this.radianFix = 0;
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
	//canvas 
	this.canvas = document.getElementById("canvas"); 
	//canvas cxt
	this.cxt = this.canvas.getContext("2d");
	// move speed
	this.speed = 500;
	// animation duration
	this.duration = 50;
	// collision R
	this.collisionR = 40;
	//scale default = 1
	this.scale = 1;
	// anchor X
	this.anchorX = 0;
	// anchor Y
	this.anchorY = 0;
	//this pointer
	var _this = this;


	/**
	 * @brief called after effect disappeared
	 *
	 * @return 
	 */
	this.endCallback = function(){
	};
	/**
	 * @brief set unit for effect
	 *
	 * @param unit1
	 * @param unit2
	 *
	 * @return 
	 */
	this.setUnit = function(unit1,unit2,callback){
		_this.fromUnit = unit1;
		_this.toUnit = unit2;
		_this.anchorX = unit1.anchorX;
		_this.anchorY = unit1.anchorY;
		_this.end = false;
		if(callback){
			_this.endCallback = callback;
		}
	};

	/**
	 * @brief move to destination coordination
	 *
	 *
	 * @return 
	 *
	 */
	this.moveTo = function(){
		var sx = _this.anchorX;
		var sy = _this.anchorY;
		var dx = _this.toUnit.anchorX;
		var dy = _this.toUnit.anchorY;
		var freq = ticker.getFreq();
		var unit = _this.speed/Math.sqrt((dx-sx)*(dx-sx)+(dy-sy)*(dy-sy))/freq;
		//if abs(unit*(dx-sx))>abs(dx-sx) then stop
		//if unit>1 then stop
		if(unit>1){
			_this.end = true;
			_this.endCallback();
			return;
		}
		var next = {};
		next.x = unit*(dx-sx)+sx;
		next.y = unit*(dy-sy)+sy;
		_this.anchorX = next.x;
		_this.anchorY = next.y;
		if(sy-dy>0){
			_this.radian = Math.atan((dx-sx)/(sy-dy));
		}else{
			_this.radian = Math.atan((dx-sx)/(sy-dy))+Math.PI;
		}
		//var a = (dx-sx)/(dy-sy);
		//_this.radian = Math.asin(0.5);
		//console.log("moveto override");
	};

	/**
	 * @brief set the region of sprite
	 *
	 * @return 
	 */
	this.setSpriteRegion = function(i,range){
		if(i>=_this.spriteList.length){
			i = 0;
		}
		if(range){
			if(i<range.start){
				i = range.start;
			}
			if(i>range.end){
				i = range.start;
			}
		}
		_this.imgRegionLeft = _this.spriteList[i][0];
		_this.imgRegionRight = _this.spriteList[i][1];
		_this.imgRegionWidth = _this.spriteList[i][2];
		_this.imgRegionHeight = _this.spriteList[i][3];
		_this.currentSprite = i;
		if(_this.currentSprite==_this.spriteList.length-1){
			_this.end = true;
			return;
		}
	};

	/**
	 * @brief calculate the direction,and set the sprite correct sprite img
	 *
	 * @return 
	 */
	this.switchSpriteRegion = function(){
		var freq = ticker.getFreq();
		var times = parseInt(_this.duration/1000*freq);
		if(ticker.getCounter()%times==0){
			_this.setSpriteRegion(_this.currentSprite+1,{start:7,end:9});
		}
	};

	/**
	 * @brief get clear region, clear all sprites and effects before draw
	 *
	 * @return 
	 */
	this.getClearRegion = function(){
		var ret = {};
		ret.left = _this.anchorX-_this.collisionR*_this.scale-1;
		ret.top = _this.anchorY-_this.imgRegionHeight*_this.collisionR/_this.imgRegionWidth*_this.scale+_this.offset-1;
		ret.width = _this.collisionR*2*_this.scale+2;
		ret.height = _this.imgRegionHeight*2*_this.collisionR/_this.imgRegionWidth*_this.scale+2;
		return ret;
	};

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

		_this.cxt.save();
		//rotate test
		_this.cxt.translate(_this.anchorX,_this.anchorY);
		_this.cxt.rotate(_this.radian+_this.radianFix);
		//rotate test end
		//clip screen
		_this.cxt.beginPath();
		_this.cxt.rect(spriteLeft,spriteTop,spriteWidth,spriteHeight);
		//_this.cxt.fillRect(spriteLeft,spriteTop,spriteWidth,spriteHeight);
		_this.cxt.closePath();
		_this.cxt.clip();

		//_this.cxt.strokeRect(spriteLeft,spriteTop,spriteWidth,spriteHeight);
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
			for(var i=0;i<numX;i++){
				_this.spriteList.push([i*regionWidth,j*regionHeight,regionWidth,regionHeight]);
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
		_this.switchSpriteRegion();
		_this.moveTo();
		_this.draw();
	};
};
