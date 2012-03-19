function main(){
	var t = 1000/60;
	var sprt = new Sprite();
	setInterval(function(){
		sprt.move(t);
		sprt.draw();
	},t);
}
window.onload = main;
