/**
 * @brief 
 *
 * @param freq frequency
 * @param auto whether auto change freq
 *
 * @return 
 */
var cnt = 0;
onmessage = function(evt){
	var freq = evt.data.freq;
	//setInterval(tick,1000/freq);
	var ret = evt.data.func();
	postMessage("tick!!!!"+cnt+ret);
};
function tick(){
	cnt++;
	//console.log("tick!!!");
	postMessage("tick!!!!"+cnt);
};
