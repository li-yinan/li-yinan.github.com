Screen = function(resource, canvas, numX, numY){
	var _physics;
    var _render;
    var _resource = resource;

	var Physics = function(numX, numY){
		var _numX = numX;
		var _numY = numY;

		this.getNumX = function(){
			return _numX;
		}

		this.getNumY = function(){
			return _numY;
		}
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
