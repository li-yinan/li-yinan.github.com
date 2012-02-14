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
		var _gridWidth = _x/numX;
		var _cxt = canvas.getContext("2d");

		this.getCxt = function(){
			return _cxt;
		};
		
		this.getGridWidth = function(){
			return _gridWidth;
		}
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
