//渲染模型
render = {};
render.toolkit = {};
render.toolkit.getRandomColor = function(depth){
    var colorStr = '#';
    for(i=0; i<6; i++)
    {
        if (0 == i%2)
        	if(depth == 1){
				colorStr += 'cdef'[Math.floor(Math.random()*4)];
			}else if(depth == 2){
				colorStr += '4567'[Math.floor(Math.random()*4)];
			}
        else
            colorStr += '0123456789abcdef'[Math.floor(Math.random()*16)]
    }
    return colorStr;
}


render.screen = function(canvas, x, y){
		//canvas高度宽度
		this.canvas = canvas;
		this.cxt = canvas.getContext("2d");
		this.x = canvas.width;
		this.y = canvas.height;

		//一共多少个格子
		this.numX = 40;
		this.numY = 30;

		if(x!=undefined){
				this.numX = x;
		}
		if(y!=undefined){
				if(y>x*this.y/this.x){
						y=parseInt(x*this.y/this.x);
				}
				this.numY = y;
		}
		//每个格子的宽度，正方形，只计算一个方向坐标
		this.gridWidth = this.x/this.numX;

		this.createGrid();
};

/**
 * @brief 创建网格
 *
 * @return 
 */
render.screen.prototype.createGrid = function(){
		for(var i=0; i<this.numX; i++){
				for(var j=0; j<this.numY; j++){
						this.drawOneGrid({x:i, y:j});
				}
		}

};

/**
 * @brief 画一个格子
 *
 * @param coordinate
 *
 * @return 
 */
render.screen.prototype.drawOneGrid = function(coordinate){
		var gridWidth = this.gridWidth;
		var x = coordinate.x*gridWidth;
		var y = coordinate.y*gridWidth;
		//随机颜色
		this.cxt.fillStyle = render.toolkit.getRandomColor(1);
		this.cxt.fillRect(x, y, this.gridWidth*0.7, this.gridWidth*0.7);
};

/**
 * @brief snake 渲染模型类
 *
 * @return 
 */
render.snake = function(canvas){
		this.canvas = canvas;
		this.snakePhysics = {};
		this.screenRender = {};
		this.cxt = canvas.getContext("2d");
}

render.snake.prototype.setSnakePhysics = function(snakePhysics){
		this.snakePhysics = snakePhysics;
};

render.snake.prototype.setScreenRender = function(screenRender){
		this.screenRender = screenRender;
};
/**
 * @brief 渲染snake
 *
 * @return 
 */
render.snake.prototype.drawSnake = function(){
		this.drawHead();
		this.drawBody();
};


/**
 * @brief 画蛇头
 *
 * @return 
 */
render.snake.prototype.drawHead = function(){
		var body = this.snakePhysics.getBody();

		var gridWidth = this.screenRender.gridWidth;
		var x = body[0].x*gridWidth;
		var y = body[0].y*gridWidth;
		this.cxt.fillStyle = "#00ff00";
		this.cxt.fillRect(x, y, gridWidth*0.7, gridWidth*0.7);
};

/**
 * @brief 画蛇身体
 *
 * @return 
 */
render.snake.prototype.drawBody = function(){
		var body = this.snakePhysics.getBody();
		var history = this.snakePhysics.getHistory();
		var fruit = this.snakePhysics.getFruit();

		var gridWidth = this.screenRender.gridWidth;

		//如果生成的果实不在尾部，就对走过的路线进行复原
		if(!(fruit.x == history.x && fruit.y == history.y)){
				this.screenRender.drawOneGrid(history);
		}
		for(var i=1; i<body.length; i++){
				var x = body[i].x*gridWidth;
				var y = body[i].y*gridWidth;
				//this.cxt.fillStyle = render.toolkit.getRandomColor(2);
				this.cxt.fillStyle = "#0000ff";
				this.cxt.fillRect(x, y, gridWidth*0.7, gridWidth*0.7);
		}
};

/**
 * @brief 画果实
 *
 * @return 
 */
render.snake.prototype.drawFruit = function(){
		var body = this.snakePhysics.getBody();
		var fruit = this.snakePhysics.getFruit();
		var gridWidth = this.screenRender.gridWidth;
		this.cxt.fillStyle = "#ff0000";
		this.cxt.fillRect(fruit.x*gridWidth, fruit.y*gridWidth, gridWidth*0.7, gridWidth*0.7);
};




