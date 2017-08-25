//Game.spawns.spawn.createCreep([WORK,CARRY,MOVE,MOVE])
module.exports = {
    
    run: function(creep){
        
		//If the creep has dropped off its load, we switch to "not working"
        if (creep.memory.working == true && creep.carry.energy == 0)
            creep.memory.working = false;
		// If the creep has filled its carry capacity, it will "work" and drop off its load.
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity)
            creep.memory.working = true;
		//If we are 'working' and have resource, the creep will proceed to its spawn or container
		//if spawn is full
        if (creep.memory.working == true) {
			
			//debugging to get proper destination
			var destination = this.findSpawnExtension(creep);
			
			response = creep.transfer(destination, RESOURCE_ENERGY)
			if (response = ERR_NOT_IN_RANGE)
				creep.moveTo(destination)
			else if (response == ERR_FULL){
				destination = this.findContainer(creep)
				if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
					creep.moveTo(container)
				}
			}
		}
        else {
            var targets = [];
			if (creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES))
				targets.push(creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES));
			if (creep.pos.findClosestByPath(FIND_SOURCES))
				targets.push(creep.pos.findClosestByPath(FIND_SOURCES));
			var source = creep.pos.findClosestByPath(targets);
			if (creep.pickup(source) == ERR_NOT_IN_RANGE)
					creep.moveTo(source);
			else{
            	if (creep.harvest(source) == ERR_NOT_IN_RANGE)
            	    creep.moveTo(source);
			}
		}
	},

	findSpawnExtension: function(creep){
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