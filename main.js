
// Include our various roleFiles and deamons
var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');
var daemonSpawn = require('daemonSpawn');
var roleFixer = require('roleFixer');
var daemonConstruction = require('daemonConstruction');
var daemonTurret = require('daemonTurret');

// Establish our gameloop
module.exports.loop = function() {
	
	// Clear memory
	for(let i in Memory.creeps){
		if (Game.creeps[i] == undefined){
			delete Memory.creeps[i]
		}
	}
	
	//If we have lost creeps, replenish them
	if (Game.time % 2 == 0)
		daemonSpawn.run();
	daemonConstruction.autoExtension();
	daemonTurret.run();
	
	// Dispatch varying creeps. 
	for (var i in Game.creeps){
		if(Game.creeps[i].memory.role == 'harvester') {
			roleHarvester.run(Game.creeps[i]);
		}
		else if (Game.creeps[i].memory.role == 'upgrader'){
			roleUpgrader.run(Game.creeps[i]);
		}
		else if (Game.creeps[i].memory.role == 'builder'){
			roleBuilder.run(Game.creeps[i]);
		}
		else if (Game.creeps[i].memory.role == 'fixer'){
			roleFixer.run(Game.creeps[i]);
		}
	}
}