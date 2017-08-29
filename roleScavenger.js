/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roleScavenger');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
	run: function(creep){
		if (creep.memory.homeRoom = undefined){
			var name = creep.name;
			creep.memory.homeRoom = Game.creeps[name].room;
		}
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
};