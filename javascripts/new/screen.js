Screen = function(resource, canvas, numX, numY){
	var _physics;
    var _render;
    var _resource = resource;

	var Physics = function(numX, numY){
		var _numX = numX;
		var _numY = numY;
		//建立一个矩阵，存放各类障碍物用于检测碰撞
		var _matrix = new toolkit.Matrix(_numX, _numY);

		//for test
		//var a = _matrix.getMatrix();

		this.getNumX = function(){
			return _numX;
		};

		this.getNumY = function(){
			return _numY;
		};
		
		this.collision = function(direction){
			var snakes = _resource.getSnakes();
			for(var i=0;i<snakes.length;i++){
				var body = snakes[i].getPhysics().getBody();
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
				if(x<0||x>_numX-1||y<0||y>_numY-1){
					return true;
				}
				if(_matrix.getValue(x, y)!=0){
					return true;
				}
			}
			return false;
		};
	};

	var Render = function(){
		var _x = canvas.width;
		var _y = canvas.height;
		var _numX = _physics.getNumX();
		var _numY = _physics.getNumY();
		var _gridWidth = _x/_numX;
		var _cxt = canvas.getContext("2d");

		this.getCxt = function(){
			return _cxt;
		};
		
		this.getGridWidth = function(){
			return _gridWidth;
		};

		this.createGrid = function(){
			for(var i=0; i<_numX; i++){
				for(var j=0; j<_numY; j++){
					this.drawOneGrid(i, j);
				}
			}

		};

		this.drawOneGrid = function(coordinateX, coordinateY){
			var x = coordinateX*_gridWidth;
			var y = coordinateY*_gridWidth;
			_cxt.fillStyle = "#ffffff";
			_cxt.fillRect(x, y, _gridWidth, _gridWidth);
			//随机颜色
			_cxt.fillStyle = toolkit.getRandomColor(1);
			_cxt.fillRect(x, y, _gridWidth*0.7, _gridWidth*0.7);
		};
	};
	_physics = new Physics(numX, numY);
	_render = new Render();

	this.setResource = function(resource){
		_resource = resource;
	};

	this.getResource = function(){
		return _resource;
	};

	this.setPhysics = function(phy){
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
