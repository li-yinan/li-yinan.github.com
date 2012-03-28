function main(){
	var ticker = new Ticker(60);
	var world = new World();
	var evtMgr = new EventManager();
	animation = new Animation();
	//animation.loadImg();
	stateMachine = new StateMachine();
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
	evtMgr.addRightClickEvent(function(x,y){
		if(world.selectedSprite){
			var sprite = world.selectedSprite;
			var sx = sprite.anchor.x;
			var sy = sprite.anchor.y;
			world.selectedSprite.velocity.add((x-sx)/3,(y-sy)/3);
		}
	});
};

window.onload = function(){
	var imgresource = {
		sprite1:"resource/spriteimg/012-Lancer04.png",
		sprite2:"resource/spriteimg/040-Mage08.png",
		sprite3:"resource/spriteimg/chr01_01_02_1.png",
		world1:"resource/worldimg/011-PortTown01.jpg",
		effect1:"resource/effectimg/Sword2.png"
	};
	new ImgLoader(imgresource,function(images){
		resource = {};
		resource.img = images;
		main();
	});
}
