/**
 * @brief State machine
 *		state:	
 *				1 stop
 *				2 moving
 *				3 attacking
 *				4 negative effect
 *				6 dead
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
	this.state = 1;
	this.prevState = this.state;
	this.stateMatrix = [];
	this.stateMatrix[1] = [2,0,2,0,0];
	this.stateMatrix[2] = [0,1,1,0,0];
	this.stateMatrix[3] = [3,3,0,0,0];
	this.stateMatrix[4] = [0,0,0,0,1];
	this.stateMatrix[5] = [0,0,0,1,0];
	this.stateMatrix[6] = [5,5,5,5,0];
	this.stateMatrix[7] = [3,0,0,0,0];
	this.stateMatrix[8] = [3,0,0,0,0];
	this.stateMatrix[9] = [4,4,4,4,0];
};

StateMachine.prototype.transfer = function(condition){
	this.prevState = this.state;
	this.state = this.stateMatrix[condition][this.state];
};

