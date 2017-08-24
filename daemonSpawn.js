

module.exports = {
	
	run: function(){
	var harvesterMin = 12;
	var upgraderMin = 2;
	var builderMin = 2;
	var fixerMin = 2;
	var harvesters = 0;
	var upgraders = 0;
	var builders = 0;
	var fixers = 0;

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
		else if (Game.creeps[i].memory.role == 'fixer'){
			fixers++;
		}
	}
	
	if (harvesters < harvesterMin){
		Game.spawns.spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester', working: false});
	}
	else if (upgraders < upgraderMin){
		Game.spawns.spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'upgrader', working: false});
	}
	else if (builders < builderMin){
		Game.spawns.spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'builder', working: false});
	}
	else{
		Game.spawns.spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'builder', working: false});
	}
	}
}