
// Include our various roleFiles and deamons
var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');
var roleBase = require('roleBase');
var daemonSpawn = require('daemonSpawn');
var roleFixer = require('roleFixer');
var daemonConstruction = require('daemonConstruction');
var daemonTurret = require('daemonTurret');
var toolsWorld = require('toolsWorld');

// Establish our gameloop
module.exports.loop = function() {

	// Clear memory
	toolsWorld.clearMemory();
	
	//If we have lost creeps, replenish them
	if (Game.time % 2 == 0){
		daemonSpawn.run();
	}
	
	//Rebuild our roads if they are destroyed.
	if (Game.time % 2 == 0){
		daemonConstruction.makeOptimalRoads();
	}
	daemonConstruction.autoExtension();
	daemonTurret.run();
	
	// Dispatch varying creeps. 
	for (var i in Game.creeps){
		if (Game.creeps[i].ticksToLive < 25){
			roleBase.recycleYourself(Game.creeps[i]);
		}
		else if(Game.creeps[i].memory.role == 'harvester') {
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