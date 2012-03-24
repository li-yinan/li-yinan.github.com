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

Vector2.prototype.negativeNew = function(){
	return new Vector2(-this.x,-this.y);
};

Vector2.prototype.negativeX = function(){
	this.x = -this.x;
	return this;
};

Vector2.prototype.negativeY = function(){
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

Vector2.prototype.addNew = function(x,y){
	return new Vector2(this.x+x,this.y+y);
};

Vector2.prototype.addV = function(v){
	this.x += v.x;
	this.y += v.y;
	return this;
};

Vector2.prototype.addVNew = function(v){
	return new Vector2(this.x+v.x,this.y+v.y);
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

Vector2.prototype.subNew = function(x,y){
	return new Vector2(this.x-x,this.y-y);
};

Vector2.prototype.subV = function(v){
	this.x -= v.x;
	this.y -= v.y;
	return this;
};

Vector2.prototype.subVNew = function(v){
	return new Vector2(this.x-v.x,this.y-v.y);
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

Vector2.prototype.mulX = function(ratio){
	this.x *= ratio;
	return this;
};

Vector2.prototype.mulY = function(ratio){
	this.y *= ratio;
	return this;
};

Vector2.prototype.mulNew = function(ratio){
	return new Vector2(this.x*ratio,this.y*ratio);
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

Vector2.prototype.nomalizeNew = function(){
	return this.mulNew(1/this.scalar());
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
Vector2.prototype.copy = function(){
	return new Vector2(this.x, this.y);
};
