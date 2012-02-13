function main(){
		var canvas = document.getElementById("canvas");
		snakePhysics1 = new physics.snake();
		snakePhysics2 = new physics.snake();
		var screenRender = new render.screen(canvas,40,30);
		var snakeRender1 = new render.snake(canvas);
		var snakeRender2 = new render.snake(canvas);
		snakePhysics1.setScreenRender(screenRender);
		snakePhysics2.setScreenRender(screenRender);
		snakePhysics1.setSnakeRender(snakeRender1);
		snakePhysics2.setSnakeRender(snakeRender2);
		snakeRender1.setScreenRender(screenRender);
		snakeRender2.setScreenRender(screenRender);
		snakeRender1.setSnakePhysics(snakePhysics1);
		snakeRender2.setSnakePhysics(snakePhysics2);


		var fruitPtr = {x:0,y:0};
		snakePhysics1.setFruit(fruitPtr);
		snakePhysics2.setFruit(fruitPtr);
		snakeRender1.drawSnake();
		snakeRender2.drawSnake();
		snakePhysics1.generateFruit();

		//var interret;

		if(switcher==1){
		//自由游走，演示
				interret = setInterval('snakePhysics1.freewalk();', 100);
				interret = setInterval('snakePhysics2.freewalk();', 100);
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
