Ticker = function(resource,tick){
	var _physics;
	var _render;
	var _resource = resource;

	var Physics = function(){
		var evtList = [];
		var tickptr;

		this.addEvent = function(evt){
			evtList.push(evt);
		};

		this.clearEvent = function(){
			evtList = [];
		};

		this.doEvent = function(){
			for(var i=0;i<evtList.length;i++){
				setTimeout(evtList[i],0);
				//evtList[i]();
			}
		}

		this.start = function(){
			tickptr = setInterval(this.doEvent,tick);
		}

		this.stop = function(){
			clearInterval(tickptr);
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
