/**
 * @brief self:
 *			group 1 type 1
 *		  arrow:
 *			group 2 type 2
 *		  enemy:
 *			group 4 type 1
 *
 *
 * @return 
 */
function main(){
	resource.config = new Config();
	resource.ticker = new Ticker(60);
	resource.world = new World();
	resource.evtMgr = new EventManager();
	resource.animation = new Animation();
	//animation.loadImg();
	resource.stateMachine = new StateMachine();
	var sprite1 = new Sprite();
	var sprite2 = new Sprite();
	var sprite3 = new Sprite();
	sprite1.config = resource.config.sprite1.mapping;
	sprite2.config = resource.config.sprite1.mapping;
	sprite3.config = resource.config.sprite1.mapping;
	sprite1.setDestX(550+30);
	sprite2.setDestX(550+60);	
	sprite3.setDestX(550+90);
	//sprite3.condition = 6;
	resource.world.addSprite(sprite1);
	resource.world.addSprite(sprite2);
	resource.world.addSprite(sprite3);
	//enemy
	var sprite4 = new Sprite();
	var sprite5 = new Sprite();
	var sprite6 = new Sprite();
	sprite4.config = resource.config.sprite1.mapping;
	sprite5.config = resource.config.sprite1.mapping;
	sprite6.config = resource.config.sprite1.mapping;
	sprite4.group = 4;
	sprite5.group = 4;
	sprite6.group = 4;
	sprite4.setDestX(800-30);
	sprite5.setDestX(800-60);	
	sprite6.setDestX(800-90);
	resource.world.addSprite(sprite4);
	resource.world.addSprite(sprite5);
	resource.world.addSprite(sprite6);
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
	resource.evtMgr.addKeyEvent(37,function(){
		//console.log("select sprite using keyboard");
		sprite1.setDestX(sprite1.anchor.x-200);
		sprite2.setDestX(sprite2.anchor.x-200);
		sprite3.setDestX(sprite3.anchor.x-200);
	});
	resource.evtMgr.addKeyEvent(39,function(){
		//console.log("select sprite using keyboard");
		sprite1.setDestX(sprite1.anchor.x+200);
		sprite2.setDestX(sprite2.anchor.x+200);
		sprite3.setDestX(sprite3.anchor.x+200);
	});
	resource.evtMgr.addLeftClickEvent(function(x,y){
		resource.world.pointOnSprite(x,y);
	});
	resource.evtMgr.addRightClickEvent(function(x,y){
		//if(resource.world.selectedSprite){
		//	var sprite = resource.world.selectedSprite;
		//	sprite.condition = 1;
		//	var sx = sprite.anchor.x;
		//	var sy = sprite.anchor.y;
		//	resource.world.selectedSprite.velocity.add((x-sx)/3,(y-sy)/3);
		//}
		var sprite = resource.world.selectedSprite;
		sprite.condition = 1;
		sprite.setDestX(x);
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
