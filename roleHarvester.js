//Game.spawns.spawn.createCreep([WORK,CARRY,MOVE,MOVE])

var daemonConstruction = require('daemonConstruction');
var roleBase = require('roleBase');

module.exports = {
    
    run: function(creep){
		//If we are 'working' and have resource, the creep will proceed to its spawn or container
		//if spawn is full
		roleBase.decideWhatToDo(creep);
        if (creep.memory.working == true) {	
			//debugging to get proper destination
			var destination = this.findReservoir(creep);	
			if (response = creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
				creep.moveTo(destination)
		}
        else {
			this.moveToSource(creep);
		}
		if (creep.memory.designer == true)
			daemonConstruction.autoRoads(creep);
	},

	moveToSource: function(creep){
		var targets = [];
		var possibleDropped = [];
		var staticSources = [];
		
		if (possibleDropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES))
			targets.push(possibleDropped);
		if (staticSources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE))
			targets.push(staticSources);
		const source = creep.pos.findClosestByPath(targets);
		if (creep.pickup(source) == ERR_NOT_IN_RANGE)
			creep.moveTo(source);
		else{
			if (creep.harvest(source) == ERR_NOT_IN_RANGE)
            	    creep.moveTo(source);
		}
	},

	findReservoir: function(creep){
		var structures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (s) => ((s.structureType == STRUCTURE_EXTENSION 
				|| s.structureType == STRUCTURE_CONTAINER 
				|| s.structureType == STRUCTURE_SPAWN 
				|| s.structureType == STRUCTURE_TOWER) &&
				s.energy < s.energyCapacity)
		});
		return (structures)
	},

	findExtension: function(creep){
		var structures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (s) => ((s.structureType == STRUCTURE_EXTENSION) &&
			s.energy < s.energyCapacity)
		});
		if (structures)
			return (structures);
		else
			return (-1);
	},

	findContainer: function(creep){
		var structures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
			filter: (s) => ((s.structureType == STRUCTURE_CONTAINER) &&
			s.energy < s.energyCapacity)
		});
		if (structures)
			return (structures);
		else
			return (-1);
	}
};