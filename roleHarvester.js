//Game.spawns.spawn.createCreep([WORK,CARRY,MOVE,MOVE])

var daemonRoads = require('daemonRoads');
var roleBase = require('roleBase');

module.exports = {
    
    run: function(creep){
		//If we are 'working' and have resource, the creep will proceed to its spawn or container
		//if spawn is full
		roleBase.decideWhatToDo(creep);
        if (creep.memory.working == true) {	
			//debugging to get proper destination
			var destination = this.findSpawnOrExtension(creep);
			response = creep.transfer(destination, RESOURCE_ENERGY)
			if (response = ERR_NOT_IN_RANGE)
				creep.moveTo(destination)
			else if (response == ERR_FULL){
				destination = this.findContainer(creep)
				if (creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
					creep.moveTo(destination)
				}
			}
		}
        else {
			this.moveToSource(creep);
		}
		if (creep.memory.designer == true)
			daemonRoads.autoRoads(creep);
	},

	moveToSource: function(creep){
		var targets = [];
		var possibleDropped = [];
		var staticSources = [];
		
		if (possibleDropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES))
			targets.push(possibleDropped);
		if (staticSources = creep.pos.findClosestByPath(FIND_SOURCES))
			targets.push(staticSources);
		var source = creep.pos.findClosestByPath(targets);
		if (creep.pickup(source) == ERR_NOT_IN_RANGE)
			creep.moveTo(source);
		else{
			if (creep.harvest(source) == ERR_NOT_IN_RANGE)
            	    creep.moveTo(source);
		}
		targets = null;
		source = null;
		possibleDropped = null;
		staticSources = null;
	},

	findSpawnOrExtension: function(creep){
		var structures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (s) => ((s.structureType == STRUCTURE_SPAWN ||
			s.structureType == STRUCTURE_EXTENSION) &&
			s.energy < s.energyCapacity)
		});
		return (structures);
	},

	findContainer: function(creep){
		var structures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: (s) => ((s.structureType == STRUCTURE_CONTAINER) &&
			s.energy < s.energyCapacity)
		});
		return (structures);
	}
};