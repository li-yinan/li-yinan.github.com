Animation = function(){
	this.images = null;
};

Animation.prototype.loadImg = function(){
	var _this = this;
	var imgresource = {
		sprite1:"resource/spriteimg/012-Lancer04.png",
		sprite2:"resource/spriteimg/040-Mage08.png",
		world1:"resource/worldimg/011-PortTown01.jpg",
		effect1:"resource/effectimg/Sword2.png"
	};
	new ImgLoader(imgresource,function(images){
		_this.setFrame();
	});
};

Animation.prototype.setFrame = function(){
	console.log("setFrame");
};

Animation.prototype.setActions = function(){
};

Animation.prototype.play = function(){
};
