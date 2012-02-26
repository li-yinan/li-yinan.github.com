ImgLoader = function(sources,callback){
	images = {};
	var loadedImages = 0;
	var numImages = 0;
	for(var src in sources){
		numImages++;
	}
	for(var src in sources){
		images[src] = new Image();
		images[src].onload = function(){
			if(++loadedImages >= numImages){
				callback();
			}
		}
		images[src].src = sources[src];
	}
};
