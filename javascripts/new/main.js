function main(){
		var canvas = document.getElementById("canvas");
		snakePhysics = new physics.snake();
		var screenRender = new render.screen(canvas,40,30);
		var snakeRender = new render.snake(canvas);
		snakePhysics.setScreenRender(screenRender);
		snakePhysics.setSnakeRender(snakeRender);
		snakeRender.setScreenRender(screenRender);
		snakeRender.setSnakePhysics(snakePhysics);


		var fruitPtr = {x:0,y:0};
		snakePhysics.setFruit(fruitPtr);
		snakeRender.drawSnake();
		snakePhysics.generateFruit();

		//var interret;

		if(switcher==1){
		//自由游走，演示
				interret = setInterval('snakePhysics.freewalk();', 10);
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
