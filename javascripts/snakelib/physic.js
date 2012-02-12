//物理模型及动作逻辑
physics = {};

/**
 * @brief snake逻辑
 *
 * @return 
 */
physics.snake = function(){
		//身体坐标
		snake = this;
		this.body = [];
		this.history = {};
		this.screenRender = {};
		this.snakeRender = {};
		this.collisionTimes = 0;
		this.initialCoordination = [{x:10,y:10},{x:11,y:10},{x:12,y:10},{x:13,y:10},{x:14,y:10}];
		this.setBody(this.initialCoordination);
		this.eventManager();
		this.direction = "left";
		this.fruit = {x:0,y:0};
};

/**
 * @brief 各成员变量setter和getter
 *
 * @param 
 *
 * @return 
 */
physics.snake.prototype.setBody = function(body){
		this.body = body;
};

physics.snake.prototype.getBody = function(){
		return this.body;
};

physics.snake.prototype.setHistory = function(history){
		this.history = history;
};

physics.snake.prototype.getHistory = function(){
		return this.history;
};

physics.snake.prototype.getScreenRender = function(){
		return this.screenRender;
};

physics.snake.prototype.setScreenRender = function(screenRender){
		this.screenRender = screenRender;
};

physics.snake.prototype.getSnakeRender = function(){
		return this.snakeRender;
};

physics.snake.prototype.setSnakeRender = function(snakeRender){
		this.snakeRender= snakeRender;
};

physics.snake.prototype.setPosition = function(position){
		this.position = position;
};

physics.snake.prototype.getPosition = function(){
		return this.position;
};

physics.snake.prototype.setDirection = function(direction){
		this.direction = direction;
};

physics.snake.prototype.getDirection = function(){
		return this.direction;
};

physics.snake.prototype.setFruit = function(fruit){
		this.fruit = fruit;
};

physics.snake.prototype.getFruit= function(){
		return this.fruit;
};

/**
 * @brief snake移动的物理模型计算
 *
 * @param direction 移动方向 枚举类型 up,down,left,right
 *
 * @return 
 */
physics.snake.prototype.move = function(direction){
		if(direction==undefined){
				direction = this.getDirection();
		}
		//检测碰撞
		if(this.collision(direction)){
				this.collisionTimes++;
				//检测到超过100次连续的碰撞，肯定进死胡同了
				if(this.collisionTimes>100){
						this.setBody([{x:10,y:10},{x:11,y:10},{x:12,y:10},{x:13,y:10},{x:14,y:10}]);
						this.setDirection("left");
						var screenRender = this.getScreenRender();
						screenRender.createGrid();
						this.generateFruit();
						//console.log("collision!!");
				}
				return false;
		}else{
				this.collisionTimes = 0;
		}
		//检测障碍物
		//占位，暂无	

		var body = this.getBody();
		var history = this.getHistory();
		var length = body.length;
		var temp = {};

		this.setHistory(body[length-1]);
		temp.x = body[0].x;
		temp.y = body[0].y;

		for(var i=length-1; i>0; i--){
				body[i] = body[i-1];
		}

		switch(direction){
				case('up'):
				case(0):
						temp.y--;break;
				case('right'):
				case(1):
						temp.x++;break;
				case('down'):
				case(2):
						temp.y++;break;
				case('left'):
				case(3):
						temp.x--;break;
		}
		body[0] = temp;

		//调用render进行渲染
		var snakeRender = this.getSnakeRender();
		snakeRender.drawSnake();
		//检测果实
		this.detectFruit();
		return true;
};

/**
 * @brief 检测碰撞
 *
 * @return 
 */
physics.snake.prototype.collision = function(direction){
		var body = this.getBody();
		var screenRender = this.getScreenRender();

		var length = body.length;
		var x = body[0].x;
		var y = body[0].y;

		switch(direction){
				case('up'):
				case(0):
						y--;break;
				case('right'):
				case(1):
						x++;break;
				case('down'):
				case(2):
						y++;break;
				case('left'):
				case(3):
						x--;break;
		}
		//撞墙检测
		if(x<0||x>screenRender.numX-1||y<0||y>screenRender.numY-1){
				return true;
		}
		//撞自己检测
		for(var i=0 ; i<length; i++){
				if(x == body[i].x && y == body[i].y){
						return true;
				}
		}
		return false;
};

/**
 * @brief 增加一节
 *
 * @return 
 */
physics.snake.prototype.bodyAdd = function(){
		var body = this.getBody();
		var history = this.getHistory();

		body.push({x:history.x,y:history.y});
};


/**
 * @brief 键盘控制
 *
 * @param evt
 *
 * @return 
 */
physics.snake.prototype.eventManager = function(){
		if(document.addEventListener){
				document.addEventListener("keydown",this.keyCtrl,false);
		}else if(document.attachEvent){
				document.attachEvent("onkeydown",this.keyCtrl);
		}

};

physics.snake.prototype.keyCtrl = function(evt){
		var keyCode = evt.keyCode;
		//console.log(evt.keyCode);
		//up:38;right:39;down:40;left:37;
		switch(keyCode){
				case 38:{
								//snake.move("up");
								if(snake.getDirection()=="down"){
										snake.setDirection("down");
								}else{
										snake.setDirection("up");
								}
								break;
						};
				case 39:{
								//snake.move("right");
								if(snake.getDirection()=="left"){
										snake.setDirection("left");
								}else{
										snake.setDirection("right");
								}
								break;
						};
				case 40:{
								//snake.move("down");
								if(snake.getDirection()=="up"){
										snake.setDirection("up");
								}else{
										snake.setDirection("down");
								}
								break;
						};
				case 37:{
								//snake.move("left");
								if(snake.getDirection()=="right"){
										snake.setDirection("right");
								}else{
										snake.setDirection("left");
								}
								break;
						};
		};
};

/**
 * @brief 随机生成果实
 *
 * @return 
 */
physics.snake.prototype.generateFruit = function(){
		var body = this.getBody();
		var screenRender = this.getScreenRender();
		var generateSuccess = false;
		var x;
		var y;
		while(!generateSuccess){
				var flag = true;
				x = parseInt(Math.random()*screenRender.numX);
				y = parseInt(Math.random()*screenRender.numY);
				for(var i=0;i<body.length;i++){
						if(x==body[i].x && y==body[i].y){
								flag = false;
								break;
						}
				}
				if(flag){
						generateSuccess = true;
				}
		}
		this.setFruit({x:x,y:y});
		//console.log(this.getFruit());
		var snakeRender = this.getSnakeRender();
		snakeRender.drawFruit();
};
physics.snake.prototype.detectFruit = function(){
		var body = this.getBody();
		var fruit = this.getFruit();
		if(fruit.x==body[0].x && fruit.y==body[0].y){
				this.bodyAdd();
				this.generateFruit();
		}
};
