function main(){
	resource.ticker = new Ticker(60);
	resource.world = new World();
	resource.evtMgr = new EventManager();
	resource.animation = new Animation();
	//animation.loadImg();
	resource.stateMachine = new StateMachine();
	var sprite1 = new Sprite();
	sprite1.config = [resource.img.sprite3,224,0,32,32,-16,-16,32,32];
	var sprite2 = new Sprite();
	sprite2.config = [resource.img.sprite3,224,0,32,32,-16,-16,32,32];
	var sprite3 = new Sprite();
	sprite3.config = [resource.img.sprite3,224,0,32,32,-16,-16,32,32];
	sprite1.condition = 3;
	sprite2.condition = 3;
	sprite3.condition = 3;
	resource.world.addSprite(sprite1);
	resource.world.addSprite(sprite2);
	resource.world.addSprite(sprite3);
	resource.ticker.addTickEvent(function(t){
	//ticker.addTimeEvent(200,10,function(t){
		resource.world.frameCtrl(t);
	});
	resource.ticker.start();

	for(var i=0;i<10;i++){
		(function(cnt){
			resource.evtMgr.addKeyEvent(49+cnt,function(){
				//console.log("select sprite using keyboard");
				resource.world.selectSpriteByKeyboard(cnt);
			});
		})(i);
	}
	resource.evtMgr.addLeftClickEvent(function(x,y){
		//obj1.setDest(x,y);
		resource.world.pointOnSprite(x,y);
	});
	resource.evtMgr.addRightClickEvent(function(x,y){
		if(resource.world.selectedSprite){
			var sprite = resource.world.selectedSprite;
			var sx = sprite.anchor.x;
			var sy = sprite.anchor.y;
			resource.world.selectedSprite.velocity.add((x-sx)/3,(y-sy)/3);
		}
	});
};

window.onload = function(){
	var imgresource = {
		//world1:"resource/worldimg/011-PortTown01.jpg",
		//effect1:"resource/effectimg/Sword2.png",
		//sprite1:"resource/spriteimg/012-Lancer04.png",
		//sprite2:"resource/spriteimg/040-Mage08.png",
		sprite3:"resource/spriteimg/chr01_01_02_1.png"
	};
	new ImgLoader(imgresource,function(images){
		resource = {};
		resource.img = images;
		main();
	});
}
