Sprite = function(){
	// image of sprite
	this.img = undefined;
	//direction
	this.direction = 0;
	// collision R
	this.collisionR = 40;
	// move speed
	this.speed = 2000;
	// destination X
	this.destX = 0;
	// destination Y
	this.destY = 0;
	// anchor X
	this.anchorX = 20;
	// anchor Y
	this.anchorY = 20;
	//z-index
	this.zIndex = 1;
	// whether the sprite is visible,related with collision
	this.visibility = true;
	// setInterval ptr
	this.timer = undefined;

	/**
	 * @brief move to someplace
	 *
	 * @param destX
	 * @param destY
	 *
	 * @return 
	 *
	 * @throw "pleaseoverwrite this function!"
	 */
	this.moveTo = function(destX, destY){
		throw("please overwrite this function!");
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
	 * @brief scale the img
	 *
	 * @return 
	 *
	 * @throw "pleaseoverwrite this function!"
	 */
	this.scale = function(){
		throw("please overwrite this function!");
	};

	/**
	 * @brief draw the sprite
	 *
	 * @return 
	 *
	 * @throw "pleaseoverwrite this function!"
	 */
	this.draw = function(){
		throw("please overwrite this function!");
	};

	/**
	 * @brief called by ticker 
	 *
	 * @return 
	 */
	this.frame = function(){
		throw("please overwrite this function!");
	}
};
