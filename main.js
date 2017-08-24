var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');

module.exports.loop = function() {

	//clear memory
	for(let i in Memory.creeps){
		if (Game.creeps[i] == undefined){
			delete Memory.creeps[i]
		}
	}

	//Figure out how many creeps we have, and their type
	var harvesters = [];
	var upgraders = [];
	for(var i in Game.creeps) {
		if(Game.creeps[i].memory.role == 'harvester') {
			harvesters.push(Game.creeps[i]);
		}
		else if (Game.creeps[i].memory.role == 'upgrader'){
			upgraders.push(Game.creeps[i]);
		}
	}

	//If we have lost creeps, replenish them
	if (harvesters.length < 10){
		Game.spawns.spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester', working: false});
	}
	else if (upgraders.length < 5){
		Game.spawns.spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader', working: false});
	}

	for (var i in Game.creeps){
		if(Game.creeps[i].memory.role == 'harvester') {
			roleHarvester.run(Game.creeps[i]);
		}
		else if (Game.creeps[i].memory.role == 'upgrader'){
			roleUpgrader.run(Game.creeps[i]);
		}
	}
}