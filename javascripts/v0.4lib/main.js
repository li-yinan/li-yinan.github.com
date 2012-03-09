function main(){
	function start(images){
		ticker = new Ticker(60,false);//frequency
		world = new World(images);
		obj1 = new Obj1(images);
		obj2 = new Obj2(images);
		obj3 = new Obj2(images);
		obj4 = new Obj2(images);
		//obj2.setFollower(obj1);
		obj3.setFollower(obj2);
		obj4.setFollower(obj3);
		//ticker.addEvent(obj.frameCtrl);
		world.addSprite(obj1);
		world.addSprite(obj2);
		world.addSprite(obj3);
		world.addSprite(obj4);
		ticker.addEvent(world.frameCtrl);
		ticker.start();

		var evtMgr = new EventManager(world);

		evtMgr.addKeyEvent(38,function(){
			//obj.setDest(obj.destX,obj.destY-100);
			world.rollMap(0,50);
		});
		evtMgr.addKeyEvent(39,function(){
			//obj.setDest(obj.destX+100,obj.destY);
			world.rollMap(-50,0);
		});
		evtMgr.addKeyEvent(40,function(){
			//obj.setDest(obj.destX,obj.destY+100);
			world.rollMap(0,-50);
		});
		evtMgr.addKeyEvent(37,function(){
			//obj.setDest(obj.destX-100,obj.destY);
			world.rollMap(50,0);
		});
		//select sprite using keyboard number
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
			world.selectSprite(x,y);
		});
		evtMgr.addRightClickEvent(function(x,y){
			//obj1.setDest(x,y);
			if(world.selectedSprite){
				var sprite = world.pointOnSprite(x,y);
				if(sprite){
					world.selectedSprite.setFollower(sprite);
				}else{
					world.selectedSprite.setFollower();
				}
				world.selectedSprite.setDest(x,y);
			}
		});

		evtMgr.addKeyEvent(32,function(){
			if(ticker.isActive()){
				ticker.stop();
			}else{
				ticker.start();
			}
		});
	}

	var imgresource = {
		sprite1:"resource/spriteimg/012-Lancer04.png",
		sprite2:"resource/spriteimg/040-Mage08.png",
		world1:"resource/worldimg/011-PortTown01.jpg"
	};

	new ImgLoader(imgresource,start);

};
//window.addEventListener("load",main);
window.onload = main;
