//Game.spawns.spawn.createCreep([WORK,CARRY,MOVE,MOVE])
module.exports = {
    
    run: function(creep){
        
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.ticksToLive < 200 && creep.memory.working == false){
		    if (Game.spawns.spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
		        creep.moveTo(Game.spawns.spawn)
		    }
        }
        if (creep.memory.working == true) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
           var source = undefined;
		   if (creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)){
				source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
				if (creep.pickup(source) == ERR_NOT_IN_RANGE)
					creep.moveTo(source);
			}
			else{
				source = creep.pos.findClosestByPath(FIND_SOURCES);
            	if (creep.harvest(source) == ERR_NOT_IN_RANGE)
            	    creep.moveTo(source);
			}
		}
	}
};