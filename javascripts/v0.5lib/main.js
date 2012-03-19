function main(){
	var sprt = new Sprite();
	setInterval(function(){
		sprt.move(1000/60);
		sprt.draw();
	},1000/60);
}
window.onload = main;
