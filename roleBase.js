/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roleBase');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
    decideWhatToDo: function(creep){
		//If the creep has dropped off its load, we switch to "not working"
        if (creep.memory.working == true && creep.carry.energy == 0)
            creep.memory.working = false;
		// If the creep has filled its carry capacity, it will "work" and drop off its load.
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
            creep.memory.working = true;
			if (creep.memory.role == 'harvester')
				creep.say("🌿");
			else if (creep.memory.role == 'upgrader')
				creep.say("➕");
			else if (creep.memory.role == 'builder')
				creep.say("⚒️");
			else if (creep.memory.role == 'fixer')
				creep.say("👷");
			else if (creep.memory.role == 'scavenger')
				creep.say("🐦");
		}
	},
	
	recycleYourself: function(creep){
		creep.memory.role = 'recycle'
		creep.say("💀");
		var destination = this.findSpawn(creep);
		if (creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
			creep.moveTo(destination);
		}
		else if (creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_ENERGY){
			destination.recycleCreep(creep);
		}
	},

	findSpawn: function (creep){
	var structures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
		filter: (s) => ((s.structureType == STRUCTURE_SPAWN) &&
		s.energy < s.energyCapacity)
	});
	if (structures){
		return (structures);
	}
	else
		return (-1);
	},
};