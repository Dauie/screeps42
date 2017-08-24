module.export ={
	run: function(creep){
		if (creep.carry.energy == 0){
			if (Game.spawns.spawn.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
				creep.moveTo(Game.spawns.spawn);
			}
		}
		else {
			var target = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (target.length){
				if (creep.build(target[0]) == ERR_NOT_IN_RANGE){
					creep.moveTo(target[0]);
				}
			}
			else {
				if(creep.upgradeController(creep.room.controller) ==  ERR_NOT_IN_RANGE){
		        creep.moveTo(creep.room.controller);
				}
			}
		}
	}
}