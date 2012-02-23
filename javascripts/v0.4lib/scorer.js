Scorer = function(resource,index,callback){
	var _physics;
    var _render;
    var _resource = resource;

	var Physics = function(){
		var _score = 0;
		var _index = index;

		this.eatFruit = function(){
			var body  =_resource.getSnake(_index).getPhysics().getBody();
			_score += 10+body.length-6;
			callback(_score,_index);
		};
		
		this.die = function(){
			_score -= 5;
			callback(_score,_index);
		};

	};

	var Render = function(){

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
