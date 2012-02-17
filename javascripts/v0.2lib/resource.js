Resource = function(snakeNum){
	var _fruit = new Fruit(this);
	//var _snake = [new Snake(this),new Snake(this),new Snake(this)];
	//var _snake = [new Snake(this)];
	var _snake = [];
	for(var i=0;i<snakeNum;i++){
		_snake.push(new Snake(this));
	}
	var _canvas = document.getElementById("canvas");
	var _screen = new Screen(this,canvas,40,30);
	_screen.getRender().createGrid();
	//_fruit.getPhysics().generateFruit();

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
	snake2.freewalk();
	//snake.getRender().drawSnake();
};

function main(){
	var snakeNum = 3;
	var _res = new Resource(snakeNum);
	_res.getSnake(1).getRender().setColor("#00ff00","#0f0f0f");
	_res.getSnake(2).getRender().setColor("#00ff00","#3f3f3f");
	_res.getFruit().getPhysics().generateFruit();
	snake0 = _res.getSnake(0).getPhysics();
	snake1 = _res.getSnake(1).getPhysics();
	snake2 = _res.getSnake(2).getPhysics();
	//snake = _res.getSnake(1);
	interret = setInterval('run();', 100);
	//interret = setInterval('snake0.freewalk();', 100);
	//interret = setInterval('snake1.freewalk();', 100);
};

window.onload = main;
