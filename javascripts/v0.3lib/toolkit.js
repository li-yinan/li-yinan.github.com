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
};

toolkit.Matrix = function(x,y){
	var _matrix = [];
	var _x = x;
	var _y = y;
	for(var i=0;i<_x;i++){
		var temp = [];
		for(var j=0;j<_y;j++){ 
			temp[j] = 0;
		}
		_matrix.push(temp);
	};

	this.getMatrix = function(){
		return _matrix;
	};

	this.getValue = function(x,y){
		if(x>0&&y>0){
			return _matrix[x][y];
		}else{
			return 10;//大于0就行
		}
	};

	this.clear = function(x,y){
		_matrix[x][y] = 0;
	};

	this.setValue = function(value,x,y){
		if(x>0&&y>0){
			_matrix[x][y] = value;
		}
	};

	this.setValues = function(value,arr){
		for(var i=0;i<arr.length;i++){
			if(arr[i].x>0&&arr[i].y>0){
				_matrix[arr[i].x][arr[i].y] = value;
			}
		}
	};

	this.empty = function(){
		_matrix = [];
		for(var i=0;i<_x;i++){
			var temp = []
				for(var j=0;j<_y;j++){ 
					temp[j] = 0;
				}
			_matrix.push(temp);
		};
	};
}
