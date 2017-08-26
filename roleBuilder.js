var roleHarvester = require('roleHarvester');

module.exports ={
	
	run: function(creep){
		if (creep.carry.energy == 0){
			if (creep.ticksToLive < 200){
		    	if (Game.spawns.spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
		            creep.moveTo(Game.spawns.spawn)
				}
			}
			roleHarvester.moveToSource(creep);
		}
		else {
			this.doConstruction(creep);
		}
	},
	
	doConstruction: function(creep){
		var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
		if (target){
			if (creep.build(target) == ERR_NOT_IN_RANGE){
				creep.moveTo(target);
			}
		}
		else
			return (-1);
		}
}