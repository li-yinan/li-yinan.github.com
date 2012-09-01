Fruit = function(resource){
	var _physics;
    var _render;
    var _resource = resource;

	var Physics = function(){
		var _x = 0;
		var _y = 0;

		this.reset = function(){
			_resource.getScreen().getRender().drawOneGrid(_x,_y);
		};

		this.detectFruit = function(){
			for(var i=0; i<resource.getSnakes().length; i++){
				var body = _resource.getSnake(i).getPhysics().getBody();
				if(_x==body[i].x && _y==body[i].y){
					_resource.getSnake(i).getPhysics().bodyAdd();
					_resource.getScorer(i).getPhysics().eatFruit();
					this.generateFruit();
				}
			}
		};

		this.generateFruit = function(){
			var numX = _resource.getScreen().getPhysics().getNumX();
			var numY = _resource.getScreen().getPhysics().getNumY();
			var generateSuccess = false;
			while(!generateSuccess){
				_x = parseInt(Math.random()*numX);
				_y = parseInt(Math.random()*numY);
				if(_resource.getScreen().getPhysics().getMatrix().getValue(_x, _y)==0){
					generateSuccess = true;
				}
			}
			_render.drawFruit();
		};

		this.getFruitX = function(){
			return _x;
		};

		this.getFruitY = function(){
			return _y;
		};
		
	};

	var Render = function(){
		this.drawFruit = function(){
			var cxt = _resource.getScreen().getRender().getCxt();
			var x = _physics.getFruitX(); 
			var y = _physics.getFruitY(); 
			var gridWidth = _resource.getScreen().getRender().getGridWidth();
			cxt.fillStyle = "#ffffff";
			cxt.fillRect(x*gridWidth, y*gridWidth, gridWidth, gridWidth);
			cxt.fillStyle = "#ff0000";
			cxt.fillRect(x*gridWidth, y*gridWidth, gridWidth*0.7, gridWidth*0.7);
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
