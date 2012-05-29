function Container(){
	this.obj = {};
	this.next = 0;
	this.cnt = 0;
};

Container.prototype.add = function(obj){
	this.onAdd(obj);
	obj.name = "obj"+this.next;
	this.obj[obj.name] = obj;
	this.next++;
	this.cnt++;
};

Container.prototype.del = function(obj){
	this.onDel(obj);
	if(!this.obj[obj.name]){
		console.log("can't find this object");
		return;
	}
	delete this.obj[obj.name];
	this.cnt--;
	if(this.cnt==0){
		this.onNull();
	}
};

Container.prototype.do = function(func){
	this.onDo(func);
	for(var i in this.obj){
		func(this.obj[i]);
	}
};

Container.prototype.onAdd = function(obj){
	throw("please override onAdd function");
};

Container.prototype.onDel = function(obj){
	throw("please override onDel function");
};

Container.prototype.onDo = function(obj){
	throw("please override onDo function");
};

Container.prototype.onNull = function(){
	throw("please override onNull function");
};
/*unit test
function Test(obj){
	console.log("Test:"+obj.a);
};

function TestContainer(){
};

TestContainer.prototype = new Container();

TestContainer.prototype.onAdd = function(){
	console.log("onAdd");
};
TestContainer.prototype.onDel = function(){
	console.log("onDel");
};
TestContainer.prototype.onDo = function(){
	console.log("onDo");
};
TestContainer.prototype.onNull = function(){
	console.log("onNull");
};

var a = new TestContainer();
var va = {a:1}; 
var vb = {a:2}; 
var vc = {a:3}; 
var vd = {a:4}; 
a.add(va);
a.add(vb);
a.add(vc);
a.add(vd);
a.do(Test);
a.del(va);
a.del(vb);
a.del(vc);
a.del(vc);
a.del(vd);
a.do(Test);
*/
