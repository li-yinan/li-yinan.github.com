/**
 * @brief Vector 2d
 *
 * @param x
 * @param y
 *
 * @return 
 */
var Vector2 = function(x, y){
	this.x = x;
	this.y = y;
};

/**
 * @brief clear vector
 *
 * @return 
 */
Vector2.prototype.setZero = function(){
	this.x = 0.0;
	this.y = 0.0;
	return this;
};

/**
 * @brief set value
 *
 * @param x
 * @param y
 *
 * @return 
 */
Vector2.prototype.set = function(x,y){
	this.x=x;
	this.y=y;
	return this;
};

Vector2.prototype.setV = function(v){
	this.x=v.x;
	this.y=v.y;
	return this;
};

/**
 * @brief make negative vector
 *
 * @return 
 */
Vector2.prototype.negative = function(){
	this.x = -this.x;
	this.y = -this.y;
	return this;
};

/**
 * @brief add 2 vectors
 *
 * @param x
 * @param y
 *
 * @return 
 */
Vector2.prototype.add = function(x,y){
	this.x += x;
	this.y += y;
	return this;
};

Vector2.prototype.addV = function(v){
	this.x += v.x;
	this.y += v.y;
	return this;
};

/**
 * @brief sub 2 vectors
 *
 * @param x
 * @param y
 *
 * @return 
 */
Vector2.prototype.sub = function(x,y){
	this.x -= x;
	this.y -= y;
	return this;
};

Vector2.prototype.subV = function(v){
	this.x -= v.x;
	this.y -= v.y;
	return this;
};

/**
 * @brief multiply a ratio
 *
 * @param ratio
 *
 * @return 
 */
Vector2.prototype.mul = function(ratio){
	this.x *= ratio;
	this.y *= ratio;
	return this;
};

/**
 * @brief nomalization
 *
 * @param ratio
 *
 * @return 
 */
Vector2.prototype.nomalize = function(){
	this.mul(1/this.scalar());
	return this;
};

/**
 * @brief get vector dot multiply
 *
 * @param x
 * @param y
 *
 * @return 
 */
Vector2.prototype.getDot = function(x,y){
	return this.x*x+this.y*y;
};

Vector2.prototype.getDotV = function(v){
	return this.x*v.x+this.y*v.y;
};

/**
 * @brief convert vector to scalar
 *
 * @return 
 */
Vector2.prototype.getScalar = function(){
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * @brief get vector radian
 *
 * @return 
 */
Vector2.prototype.getRadian = function(){
	if(this.y>0){
		return Math.atan(this.x/this.y);
	}else{
		return Math.atan(this.x/this.y)+Math.PI;
	}
};

/**
 * @brief deep copy a vector
 *
 * @param x
 * @param y
 *
 * @return 
 */
Vector2.prototype.copy = function(x, y){
	return new Vector(x, y);
};

Vector2.prototype.copyV = function(v){
	return new Vector(v.x, v.y);
};
