var Matrix = function(){
    var _x=0;
    var _y=0;
    var _mat = [];
    
    Matrix.prototype.inputReader = function(stringMap){
        var line = stringMap.split("\n");
        for(var i=0;i<line.length;i++){
            _mat[i] = line[i].split(/ +/);
        }
        _mat.length = line.length;
        _x = _mat[0].length;
        _y = _mat.length;
    };
    
    Matrix.prototype.stringToInt = function(){
        for(var j=0;j<_mat.length;j++){
            for(var i=0;i<_mat[j].length;i++){
                _mat[j][i] = parseInt(_mat[j][i]);
            }
        }
    };
    
    Matrix.prototype.toString = function(){
        return this.getResult();
    };
    Matrix.prototype.getResult = function(){
        var ret = "";
        ret+="<table><tbody>";
        for(var i=0;i<_mat.length;i++){
        	//console.log(_mat[i]);
            ret+="<tr>"+_mat[i].join("")+"</tr>";
        }
        ret+="</tbody></table>";
        return ret;
    };
    
    Matrix.prototype.set = function(value,x,y){
        _mat[y][x] = value;
    };
    
    Matrix.prototype.get = function(x,y){
        return _mat[y][x];
    };
    
    Matrix.prototype.getWidth = function(){
        return _x;
    };
    
    Matrix.prototype.getHeight = function(){
        return _y;
    };
    
    Matrix.prototype.mapReduce = function(func){
        for(var j=0;j<_mat.length;j++){
            for(var i=0;i<_mat[j].length;i++){
                func(i,j);
            }
        }
    };
};

var Queue = function(){
    var _q = [];
    
    Queue.prototype.add = function(element){
        _q.push(element);
    };
    
    Queue.prototype.put = function(element){
        this.add(element);
    };
    
    Queue.prototype.poll = function(){
        return _q.shift();
    };
    
    Queue.prototype.peek = function(){
        if(_q.length!=0){
        	return _q[0];
        }else{
            return null;
        }
        
    };
    
    Queue.prototype.clear = function(){
        _q = [];
    };
    
    Queue.prototype.isEmpty = function(){
        if(_q.length==0){
            return true;
        }else{
            return false;
        };
    };
};

var State = function(){
    this.x;
    this.y;
    this.f;
    this.g;
    this.h;
    this.prev;
};

var Astar = function(){
    var _mat = new Matrix();
    var _stringMap = "";
    var _q = new Queue();
    var _sx=0,_sy=0,_dx=0,_dy=0;
    var _startState;
    var _finishState=null;
    var path = [[-1,0],[1,0],[0,1],[0,-1]];
    //var path = [[-1,0],[1,0],[0,1],[0,-1],[-1,-1],[-1,1],[1,-1],[1,1]];
    
    var readMap = function(){
        _mat.inputReader(_stringMap);
        _mat.stringToInt();
    };	
    
    var distance = function(state){
        dist = Math.sqrt(Math.pow(state.x-_dx,2)+Math.pow(state.y-_dy,2));
        return parseInt(dist);
    };	
    
    Astar.prototype.solve = function(stringMap){
        _stringMap = stringMap;
        init();
        aStar();
    };	
    
    var isAnswer = function(state){
        return state.x == _dx && state.y == _dy;
    };	
    
    var aStar = function(){
        var ok = false;
        while(!ok && ! _q.isEmpty()){
            var tmp = _q.poll();
            if(isAnswer(tmp)){
                _finishState = tmp;
                ok = true;
                return tmp.f;
            }else {
                expand(tmp);
            };
        }
        return -1;
    };	
    
    Astar.prototype.toString = function(){
        return this.getResult();
    };
    Astar.prototype.getResult = function(){
        var state = _finishState;
        readMap();
        while(state!=null){
            _mat.set("<span class=\"choosen\">"+_mat.get(state.x, state.y)+"</span>", state.x, state.y);
            //_mat.set(-state.g, state.x, state.y);
            state = state.prev;
        }
        _mat.mapReduce(function(x,y){
            _mat.set("<td class=\"col\">"+_mat.get(x, y)+"</td>", x, y);
        });
        return _mat.toString();
    };
    
    var insertIntoTableTwo = function(state){
        if(_mat.get(state.x, state.y) <= state.f)
            return false;
        _mat.set(state.f, state.x, state.y);
        return true;
    };
    
    var expand = function(state){
        for(var i = 0;i < path.length;i++){
            var newState = nextPosition(state,i);
            if(newState == null) continue;
            newState.h = distance(newState);
            newState.g = state.g + 1;
            newState.f = newState.h + newState.g;
            if(insertIntoTableTwo(newState)){
                newState.prev = state;
                _q.add(newState);
            };
        };
    };	
    
    var nextPosition = function(state,direction){
        var dirx = state.x + path[direction][0];
        var diry = state.y + path[direction][1];
        if(dirx >= _mat.getWidth() || dirx < 0 || diry >= _mat.getHeight() || diry < 0)
            return null;
        //console.log("dirx:"+dirx+" _mat.getWidth():"+_mat.getWidth()+" diry:"+diry+" _mat.getHeight():"+_mat.getHeight());
        if(_mat.get(dirx, diry)==-1)
            return null;
        var newState = new State();
        newState.x = dirx;
        newState.y = diry;
        newState.prev = state;
        return newState;
    };	
    
    var init = function(){
        readMap();
        _startState = new State();
        _mat.mapReduce(function(x,y){
            switch(_mat.get(x, y)){
                case 1:{
                	_startState.x = x;
                	_startState.y = y;
                	_sx = x;
                	_sy = y;
                    _mat.set(10000, x, y);
                    break;
                }
                case 2:{
                	_dx = x;
                	_dy = y;
                    _mat.set(10000, x, y);
                    break;
                }
                case 3:{
                    _mat.set(-1, x, y);
                    break;
                }
                default:{
                    _mat.set(10000, x, y);
                }
            }
        });
        _startState.g = 0;
        _startState.h = distance(_sx,_sy);
        _startState.f = _startState.g+_startState.h;
        _startState.prev = null;
        _q.add(_startState);
    };	
};