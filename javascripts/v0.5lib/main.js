function main(){
	resource = {};

	var ticker = new Ticker(60);
	var world = new World();
	var evtMgr = new EventManager();
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
	for(var i=0;i<10;i++){
		(function(cnt){
			evtMgr.addKeyEvent(49+cnt,function(){
				//console.log("select sprite using keyboard");
				world.selectSpriteByKeyboard(cnt);
			});
		})(i);
	}
	evtMgr.addLeftClickEvent(function(x,y){
		//obj1.setDest(x,y);
		world.pointOnSprite(x,y);
	});
};
window.onload = main;
