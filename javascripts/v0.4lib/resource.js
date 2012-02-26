Resource = function(snakeNum){
	var _fruit = new Fruit(this);
	//var _snake = [new Snake(this),new Snake(this),new Snake(this)];
	//var _snake = [new Snake(this)];
	var _snake = [];
	var _scorer = [];
	for(var i=0;i<snakeNum;i++){
		_snake.push(new Snake(this,i));
		_scorer.push(new Scorer(this,i,scorercallback));
	}
	var _canvas = document.getElementById("canvas");
	var _screen = new Screen(this,canvas,40,30);
	var _ticker = new Ticker(this,100);
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

	this.getScorers = function(){
		return _scorer;
	};

	this.getScorer = function(index){
		return _scorer[index];
	};

	this.getScreen = function(){
		return _screen;
	};
	this.getTicker = function(){
		return _ticker;
	}
};

function run(){
	//snake0.freewalk();
	snake0.userCtrl();
	snake1.freewalk();
	snake2.freewalk();
	//snake.getRender().drawSnake();
};

function scorercallback(score,index){
	//console.log(score,index);
	var el = document.getElementById("snake"+index);
	el.innerHTML = "snake" + index + "'s score is " + score;
};

function main(){
	var snakeNum = 3;
	var _res = new Resource(snakeNum);

	var scorer = document.getElementById("scorer");
	for(var i=0;i<snakeNum;i++){
		scorer.innerHTML +="<li id=\"snake"+i+"\">snake"+i+"'s score is 0</li>";
	}

	_res.getSnake(0).getRender().setColor("#00ff00","#0f0f0f");
	_res.getFruit().getPhysics().generateFruit();

	snake0 = _res.getSnake(0).getPhysics();
	snake1 = _res.getSnake(1).getPhysics();
	snake2 = _res.getSnake(2).getPhysics();
	//snake = _res.getSnake(1);
	//interret = setInterval('run();', 100);
	//interret = setInterval('snake0.freewalk();', 50);
	var _ticker = _res.getTicker().getPhysics();
	_ticker.addEvent(snake0.userCtrl);
	_ticker.addEvent(snake1.freewalk);
	_ticker.addEvent(snake2.freewalk);
	_ticker.start();
	//interret = setInterval('snake0.userCtrl();', 80);
	//interret = setInterval('snake1.freewalk();', 100);
	//interret = setInterval('snake2.freewalk();', 100);
};

//window.onload = main;
