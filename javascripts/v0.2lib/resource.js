Resource = function(){
	var _fruit = new Fruit(this);
	var _snake = [new Snake(this),new Snake(this)];
	var _canvas = document.getElementById("canvas");
	var _screen = new Screen(this,canvas,40,30);
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
function run(){
	snake0.freewalk();
	snake1.freewalk();
};

function main(){
	var _res = new Resource();
	///res.getFruit().getRender().generateFruit();
	_res.getScreen().getRender().createGrid();
	_res.getFruit().getPhysics().generateFruit();
	_res.getSnake(1).getRender().setColor("#00ff00","#0f0f0f");
	snake0 = _res.getSnake(0).getPhysics();
	snake1 = _res.getSnake(1).getPhysics();
	interret = setInterval('run();', 100);
};

window.onload = main;
