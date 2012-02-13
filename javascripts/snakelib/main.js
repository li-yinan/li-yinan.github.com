function main(){
		var canvas = document.getElementById("canvas");
		snakePhysics = new physics.snake();
		var screenRender = new render.screen(canvas,40,30);
		var snakeRender = new render.snake(canvas);
		snakePhysics.setScreenRender(screenRender);
		snakePhysics.setSnakeRender(snakeRender);
		snakeRender.setScreenRender(screenRender);
		snakeRender.setSnakePhysics(snakePhysics);


		snakeRender.drawSnake();
		snakePhysics.generateFruit();

		//var interret;

		if(switcher==1){
		//自由游走，演示
				interret = setInterval('freewalk();', 100);
		}else if(switcher==2){
		//手动，可玩
				interret = setInterval('while(!snakePhysics.move()){};', 100);
		}
		if(document.addEventListener){
				document.addEventListener("keydown",switcherCtrl,false);
		}else if(document.attachEvent){
				document.attachEvent("onkeydown",switcherCtrl);
		}

}

function freewalk(){
	var fruit = snakePhysics.getFruit();
	var body = snakePhysics.getBody();
	var head = body[0];

	var directionX = fruit.x-head.x;
	var directionY = fruit.y-head.y;

	if(Math.abs(directionX)>Math.abs(directionY)){
		//向x方向移动
		direction = directionX>0?1:3;
	}else{
		//向y方向移动
		direction = directionY>0?0:2;
	}

	while(!snakePhysics.move(direction)){
		direction = parseInt(Math.random()*4);
	};
}

function switcherCtrl(evt){
		//console.log(evt.keyCode);
		if(evt.keyCode == 32){
				clearInterval(interret);
				if(switcher == 1){
						switcher = 2;
				}else{
						switcher = 1;
				}
				main();
		}

}
switcher = 1;
window.onload = main;
