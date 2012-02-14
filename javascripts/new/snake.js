Snake = function(){
	var physics;
    var render;
    var resource;

	var Physics = function(){
		var x;
		var y;
	};

	var Render = function(){

	};
	physics = new Physics();
	render = new Render();

	this.setResource = function(res){
		resource = res;
	};

	this.getResource = function(){
		return resource;
	};

	this.setPhysics = function(phy){
		physics = phy;
	};

	this.getPhysics = function(){
		return physics;
	};

	this.setRender = function(ren){
		render = ren;
	};

	this.getRender = function(){
		return render;
	};
};
