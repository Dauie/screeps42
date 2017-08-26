/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roleExtractor');
 * mod.thing == 'a thing'; // true
 */

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
			var destination = this.findSpawnOrExtension(creep);
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
			this.moveToSource(creep);
		}
		daemonRoads.autoRoads(creep);
		destination = null;
	}
};