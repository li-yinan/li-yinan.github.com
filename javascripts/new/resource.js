Resource = function(){
	var _fruit = new Fruit(this);
	var _snake = [new Snake(this)];
	var _canvas = document.getElementById("canvas");
	var _screen = new Screen(this,canvas,16,12);
	//this.world = new world();
	
	//_fruit.setResource(this);

	this.getFruit = function(){
		return _fruit;
	};

	this.getSnakes = function(){
		return _snake;
	};

	this.getSnake = function(index){
		return _snake[index];
	};

	this.getScreen = function(){
		return _screen;
	};
};

function main(){
	var _res = new Resource();
	///res.getFruit().getRender().generateFruit();
	_res.getFruit().getPhysics().generateFruit();
};

window.onload = main;
