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
			var response = undefined;
			response = creep.transfer(Game.spawns.spawn, RESOURCE_ENERGY)
			if (response = ERR_NOT_IN_RANGE)
				creep.moveTo(Game.spawns.spawn)
			else if (response == ERR_FULL){
				var container = creep.pos.findInRange(FIND_STRUCTURE, 1, {filter: {structureType: STRUCTURE_CONTAINER}});
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
	}
};