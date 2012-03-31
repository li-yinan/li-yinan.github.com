/**
 * @brief State machine
 *		state:	
 *				1 stop
 *				2 moving
 *				3 attacking
 *				4 negative effect
 *				5 dead
 *
 *		condition:
 *				1 move
 *				2 stop
 *				3 attack
 *				4 revive
 *				5 out of stun
 *				6 die
 *				7 enemy in attack area
 *				8 attacked by nomal attack
 *				9 attacked by effect attack
 *
 * @return 
 */
StateMachine = function(){
	this.stateMatrix = [];
	this.stateMatrix[0] = [0,0,0,0,0,0];
	this.stateMatrix[1] = [0,2,0,2,0,0];
	this.stateMatrix[2] = [0,0,1,0,0,0];
	this.stateMatrix[3] = [0,3,3,0,0,0];
	this.stateMatrix[4] = [0,0,0,0,0,1];
	this.stateMatrix[5] = [0,0,0,0,1,0];
	this.stateMatrix[6] = [0,5,5,5,5,0];
	this.stateMatrix[7] = [0,3,0,0,0,0];
	this.stateMatrix[8] = [0,3,0,0,0,0];
	this.stateMatrix[9] = [0,4,4,4,4,0];
};

StateMachine.prototype.transfer = function(sprite){
	var condition = sprite.condition;
	var state = sprite.state;
	var newState = this.stateMatrix[condition][state];
	if(newState){
		sprite.state = newState;
		console.log("sprite "+sprite.no+" type "+sprite.type+" transfer from "+state+" to "+newState);
	}
};

