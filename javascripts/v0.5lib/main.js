function main(){
	resource = {};

	var ticker = new Ticker(60);
	var world = new World();
	world.addSprite(new Sprite());
	world.addSprite(new Sprite());
	//world.addSprite(new Sprite());
	ticker.addTickEvent(function(t){
	//ticker.addTimeEvent(200,10,function(t){
		world.frameCtrl(t);
	});
	ticker.start();

	resource.ticker = ticker;
	resource.world = world;
};
window.onload = main;
