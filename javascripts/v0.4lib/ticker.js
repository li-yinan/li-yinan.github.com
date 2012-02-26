Ticker = function(resource,tick){
	var _physics;
	var _render;
	var _resource = resource;

	var Physics = function(){
		var _evtList = [];
		var _tickptr;
		var _tick = tick;
		var _physic = this;

		this.getTick = function(){
			return _tick;
		}

		this.addEvent = function(evt){
			_evtList.push(evt);
			return _evtList.length-1;
		};

		this.clearEvent = function(i){
			_evtList[i] = undefined; 
		};

		this.doEvent = function(){
			for(var i=0;i<_evtList.length;i++){
				if(_evtList[i]){
					setTimeout(_evtList[i],0);
				}
			}
		}

		this.start = function(){
			_tickptr = setInterval(_physics.doEvent, _tick);
		}

		this.stop = function(){
			clearInterval(_tickptr);
		}
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
