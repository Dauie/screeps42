module.exports ={
	
	run: function(creep){
		if (creep.carry.energy == 0){
			if (creep.ticksToLive < 200){
		    	if (Game.spawns.spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
		            creep.moveTo(Game.spawns.spawn)
				}
			}
			if (creep.withdraw(Game.spawns.spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(Game.spawns.spawn);
			}
		}
		else {
			const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
			if (target){
				if (creep.build(target) == ERR_NOT_IN_RANGE){
					creep.moveTo(target);
				}
			}
			else {
				if(creep.upgradeController(creep.room.controller) ==  ERR_NOT_IN_RANGE){
		        	creep.moveTo(creep.room.controller);
				}
			}
		}
	},


}