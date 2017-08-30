var roleBuilder = require('roleBuilder');
module.exports ={
	run: function(creep){
		if (creep.carry.energy == 0){
			if (Game.spawns.spawn.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
				creep.moveTo(Game.spawns.spawn);
			}
		}
		else {
			creep.say("👷");
			if (!(this.findRepair(creep))){
				creep.say("⚒️");
				if (!(roleBuilder.doConstruction(creep))){
					creep.say("➕");
					if(creep.upgradeController(creep.room.controller) ==  ERR_NOT_IN_RANGE){
		        		creep.moveTo(creep.room.controller);
					}
				}	
			}
		}
	},

	findRepair: function(creep){
		const target = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
			target.sort((a,b) => a.hits - b.hits);
			if (target.length){
				if (creep.repair(target[0]) == ERR_NOT_IN_RANGE){
					creep.moveTo(target[0]);
				}
			else
				return (-1);
			}
		}
};