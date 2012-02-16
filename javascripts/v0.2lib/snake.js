Snake = function(resource){
	var _physics;
    var _render;
    var _resource = resource;

	var Physics = function(){
		var _body = [{x:10,y:10},{x:11,y:10},{x:12,y:10},{x:13,y:10},{x:14,y:10}];
		var _history = _body[_body.length-1];
		var _direction = "left";
		var _collisionTimes = 0;

		this.bodyReset = function(){
			//_body = [{x:10,y:10},{x:11,y:10},{x:12,y:10},{x:13,y:10},{x:14,y:10}];
			var snakes = _resource.getSnakes();
			for(var i=0;i<snakes.length;i++){
				var body = snakes[i].getPhysics().setBody([{x:10,y:10},{x:11,y:10},{x:12,y:10},{x:13,y:10},{x:14,y:10}]);
			}
		};

		this.move = function(direction){
			if(direction==undefined){
				direction = _direction;
			}
			//检测碰撞
			if(_resource.getScreen().getPhysics().collision(direction)){
				_collisionTimes++;
				//检测到超过100次连续的碰撞，肯定进死胡同了
				if(_collisionTimes>100){
					//重新定义对象，清空一切
					this.bodyReset();
					_direction = "left";
					_resource.getScreen().getRender().createGrid();
					_resource.getFruit().getPhysics().generateFruit();
					_collisionTimes = 0;
					console.log("die");
					//throw "die!!!";
					//return false;
				}
				return false;
			}else{
				_collisionTimes = 0;
			}
			//检测障碍物
			//占位，暂无	

			var temp = {x:_body[0].x,y:_body[0].y};

			_history = _body[_body.length-1];
			//阻止往前进相反方向行进
			switch(direction){
				case('up'):
				case(0):
					if(_direction=="down"){
						direction = "down";
					}else{
						direction = "up";
					}
					break;
				case('right'):
				case(1):
					if(_direction=="left"){
						direction = "left";
					}else{
						direction = "right";
					}
					break;
				case('down'):
				case(2):
					if(_direction=="up"){
						direction = "up";
					}else{
						direction = "down";
					}
					break;
				case('left'):
				case(3):
					if(_direction=="right"){
						direction = "right";
					}else{
						direction = "left";
					}
					break;
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
			_body.unshift(temp);
			_body.length--;

			//调用render进行渲染
			_render.drawSnake();

			_resource.getFruit().getPhysics().detectFruit();
			//将这次的方向记录下来供下次决策
			_direction = direction;
			return true;
		};

		this.freewalk = function(){
			var fruitX = _resource.getFruit().getPhysics().getFruitX();
			var fruitY = _resource.getFruit().getPhysics().getFruitY();
			var head = _body[0];

			var directionX = fruitX-head.x;
			var directionY = fruitY-head.y;
			var direction = 0;

			//if(Math.abs(directionX)>Math.abs(directionY)){
			//优先x方向移动
			if(Math.abs(directionX)>0){
				//向x方向移动
				direction = directionX>0?1:3;
			}else{
				//向y方向移动
				direction = directionY>0?2:0;
			}

			while(!this.move(direction)){
				//碰撞之后的策略
				direction = parseInt(Math.random()*4);
			}
		};

		this.bodyAdd = function(){

			_body.push({x:_history.x,y:_history.y});
		};
		
		this.getBody = function(){
			return _body;
		}

		this.setBody = function(arr){
			_body = arr;
		}

		this.getHistory = function(){
			return _history;
		}
	};

	var Render = function(){
		var _headColor = "#00ff00";
		var _bodyColor = "#0000ff";

		this.setColor = function(headColor,bodyColor){
			_headColor = headColor;
			_bodyColor = bodyColor;
		};

		this.drawSnake = function(){
			this.drawHead();
			this.drawBody();
		};

		this.drawHead = function(){
			var gridWidth = _resource.getScreen().getRender().getGridWidth();
			var cxt = _resource.getScreen().getRender().getCxt();
			var x = _physics.getBody()[0].x*gridWidth;
			var y = _physics.getBody()[0].y*gridWidth;
			cxt.fillStyle = _headColor;
			cxt.fillRect(x, y, gridWidth*0.7, gridWidth*0.7);
		};


		this.drawBody = function(){
			var gridWidth = _resource.getScreen().getRender().getGridWidth();
			var cxt = _resource.getScreen().getRender().getCxt();
			var fruitX = _resource.getFruit().getPhysics().getFruitX();
			var fruitY = _resource.getFruit().getPhysics().getFruitY();
			var history = _physics.getHistory();
			var body = _physics.getBody();


			//如果生成的果实不在尾部，就对走过的路线进行复原
			if(!(fruitX == history.x && fruitY == history.y)){
				_resource.getScreen().getRender().drawOneGrid(history.x,history.y);
			}
			for(var i=1; i<body.length; i++){
				var x = body[i].x*gridWidth;
				var y = body[i].y*gridWidth;
				cxt.fillStyle = _bodyColor;
				cxt.fillRect(x, y, gridWidth*0.7, gridWidth*0.7);
			}
		};
	};
	_physics = new Physics();
	_render = new Render();

	this.setResource = function(resource){
		_resource = resource;
	};

	this.getResource = function(){
		return _resource;
	};

	this.setPhysics = function(physics){
		_physics = physics;
	};

	this.getPhysics = function(){
		return _physics;
	};

	this.setRender = function(render){
		_render = render;
	};

	this.getRender = function(){
		return _render;
	};
};
