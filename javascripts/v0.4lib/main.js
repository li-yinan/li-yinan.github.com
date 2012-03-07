function main(){
	function start(images){
		obj = new Obj1(images);
		obj1 = new Obj2(images);
		ticker = new Ticker(60,false);//frequency
		//ticker.addEvent(obj.frameCtrl);
		world = new World(images);
		world.addSprite(obj);
		world.addSprite(obj1);
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

		evtMgr.addLeftClickEvent(function(x,y){
			//obj1.setDest(x,y);
			world.selectSprite(x,y);
		});
		evtMgr.addRightClickEvent(function(x,y){
			//obj1.setDest(x,y);
			if(world.selectedSprite){
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
