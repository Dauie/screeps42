module.exports = {
	
	run: function(){
	
	var harvesters = 0;
	var upgraders = 0;
	var builders = 0;

	for(var i in Game.creeps) {
		if(Game.creeps[i].memory.role == 'harvester') {
			harvesters++;
		}
		else if (Game.creeps[i].memory.role == 'upgrader'){
			upgraders++;
		}
		else if (Game.creeps[i].memory.role == 'builder'){
			builders++;
		}
	}
	
	if (harvesters < 12){
		Game.spawns.spawn.createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'harvester', working: false});
	}
	else if (upgraders < 3){
		Game.spawns.spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader', working: false});
	}
	else if (builders < 0){
		Game.spawns.spawn.createCreep([WORK, WORK, WORK, MOVE], undefined, {role: 'builder', working: false});
	}
	}
}