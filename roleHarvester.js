//Game.spawns.spawn.createCreep([WORK,CARRY,MOVE,MOVE])
module.exports = {
    
    run: function(creep){
        
        if (creep.memory.working == true && creep.carry.energy == 0 && creep.memory.role == 'harvester') {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            if (creep.transfer(Game.spawns.spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.spawn);
			}
			else if (creep.transfer(Game.spawns.spawn) == ERR_FULL) {
				creep.drop(RESOURCE_ENERGY, creep.carryCapacity)
			}
        }
        else {

            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }

        }
    }
};