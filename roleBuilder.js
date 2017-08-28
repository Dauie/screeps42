var roleHarvester = require('roleHarvester');
var roleBase = require('roleBase');
var roleUpgrader = require('roleUpgrader');
module.exports ={
	run: function(creep){
		roleBase.decideWhatToDo(creep);
		if (creep.memory.working == false){
			roleHarvester.moveToSource(creep);
		}
		else {
			if (!(this.doConstruction(creep))){
				roleUpgrader.upgradeController(creep);
			}
		}
	},
	
	doConstruction: function(creep){
		var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
		if (target){
			if (creep.build(target) == ERR_NOT_IN_RANGE){
				creep.moveTo(target);
			}
		}
		else
			return (-1);
		}
}