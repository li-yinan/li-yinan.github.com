﻿var Sprite = function(){
	this.no = 0;
	this.state = 1;
	this.condition = 1;
	this.r = 50;
	this.selected = false;
	this.collidable = true;
	this.sleep = false;
	this.sleepable = true;
	this.group = 1;
	this.mask = 1+2+4+8+16+32+64+128;
	this.anchor = new Vector2(Math.random()*(800-this.r*2)+this.r,Math.random()*(600-this.r*2)+this.r);
	this.dest = new Vector2(0,0);
	this.velocity = new Vector2(100,0);
	this.mass = 100+Math.random()*300;
	this.canvas = document.getElementById("canvas"); 
	this.cxt = this.canvas.getContext("2d");
	//this.cxt.transform(10,0,0,10,0,0);
};

Sprite.prototype.move = function(t){
	if(!this.sleep){
		this.anchor.addV(this.velocity.mulNew(t/1000));
	}
};

Sprite.prototype.setSleep = function(t){
	if(this.sleepable){
		this.sleep = true;
	}
};

Sprite.prototype.draw = function(){
	//this.cxt.clearRect(0,0,800,600);
	this.cxt.beginPath();
	this.cxt.arc(this.anchor.x,this.anchor.y,this.r,0,Math.PI*2,true);
	this.cxt.closePath();
	this.cxt.stroke();
	if(this.selected){
		this.cxt.beginPath();
		this.cxt.arc(this.anchor.x,this.anchor.y,this.r-10,0,Math.PI*2,true);
		this.cxt.closePath();
		this.cxt.stroke();
	}
};
Sprite.prototype.frameCtrl = function(t){
	this.move(t);
	this.draw();
};
