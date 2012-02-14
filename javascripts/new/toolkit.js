toolkit = {};
toolkit.getRandomColor = function(depth){
    var colorStr = '#';
    for(i=0; i<6; i++)
    {
        if (0 == i%2)
        	if(depth == 1){
				colorStr += 'cdef'[Math.floor(Math.random()*4)];
			}else if(depth == 2){
				colorStr += '4567'[Math.floor(Math.random()*4)];
			}
        else
            colorStr += '0123456789abcdef'[Math.floor(Math.random()*16)]
    }
    return colorStr;
}
