var toolsWorld = require('toolsWorld');

//decide on better mins, and a better method of deciding on what to spawn.
const minLoadout= {
	"harvester": 3,
	"upgrader": 4,
	"builder": 2,
	"fixer": 1
}

//Global population limits per role
const percentLoadout = {
	"harvester": 30,
	"upgrader": 40,
	"builder": 10,
	"fixer": 10,
	"scavenger": 10,
}
	
//Loadouts all start out needing 300
var creepLoadout = {
	"harvester": [WORK, CARRY, CARRY, CARRY, MOVE],
	"upgrader": [WORK, CARRY, CARRY, MOVE, MOVE],
	"builder": [WORK, CARRY, CARRY, MOVE, MOVE],
	"fixer": [WORK, CARRY, MOVE, MOVE, MOVE],
	"scavenger": [WORK, CARRY, CARRY, CARRY, MOVE],
	"soldier": [MOVE, MOVE, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH],
	"archer": [MOVE, MOVE, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH],
	"cleric": [MOVE, HEAL]
}

var bodyPartAddons = {
	"harvester": [WORK, CARRY, MOVE, TOUGH],
	"upgrader": [WORK, CARRY, MOVE, TOUGH],
	"builder": [WORK, CARRY, MOVE, TOUGH],
	"fixer": [WORK, CARRY, MOVE, TOUGH],
	"scavenger": [WORK, CARRY, MOVE, TOUGH],
	"soldier": [MOVE, ATTACK, TOUGH, TOUGH, TOUGH],
	"archer": [MOVE, RANGED_ATTACK, TOUGH],
	"cleric": [MOVE, HEAL, TOUGH]
}


var totalCreeps = {};

module.exports = {

	run: function(){

		const rooms = toolsWorld.getControlledRooms();
	
		for (var room of rooms){
			var creepAllowance = undefined;
			var creeps = toolsWorld.getCreepsByRoom(Game.rooms[room].name)
			var totals = this.getTotalsFromSample(creeps);
			var average = this.getAverageFromSample(totals);
			const sSpawn = Game.rooms[room].find(FIND_MY_STRUCTURES, {filter: 
				(s) => s.structureType == STRUCTURE_SPAWN});
			var currentEnergy = sSpawn[0].room.energyAvailable;
			if (totals['total'] < 8)
				creepAllowance = 300
			else
			 	creepAllowance = Math.floor((sSpawn[0].room.energyCapacityAvailable / 3) * 2);
			console.log(creepAllowance);
			if (creepAllowance < 300)
				creepAllowance = 300;
			if (currentEnergy >= creepAllowance){
				const role = this.getRoleToSpawn(average);
				var loadout = creepLoadout[role].slice();
				this.addBodyParts(loadout, role, creepAllowance);
				if (!(Game.spawns[sSpawn[0].name].createCreep(loadout, undefined, {role: role, working: false}))){
					delete creeps, role, loadout, totals, average, sSpawn, currentEnergy, creepAllowance;
				} 
			}	
		}
	},

	getTotalsFromSample: function(creeps) {

		var totals = {
			"harvester": 0,
			"upgrader": 0,
			"fixer": 0,
			"builder": 0,
			"scavenger": 0,
			"soldier": 0,
			"archer": 0,
			"cleric": 0,
			"total": 0
		};

		for (var creep of creeps){
			if (creep.memory.role == "harvester") {
				totals["harvester"] += 1;
			}
			else if (creep.memory.role == "upgrader"){
				totals["upgrader"] += 1;
			}
			else if (creep.memory.role == "builder"){
				totals["builder"] += 1;
			}
			else if (creep.memory.role == "fixer"){
				totals["fixer"] += 1;
			}
			totals["total"] += 1;
		}
		return (totals);
	},

	getAverageFromSample: function(totals){
		var average = {};

		if (!(average["harvester"] = Math.floor(totals["harvester"] / totals["total"] * 100)))
			average["harvester"] = 0;
		if (!(average["upgrader"] = Math.floor(totals["upgrader"] / totals["total"] * 100)))
			average["upgrader"] = 0;
		if (!(average["builder"] = Math.floor(totals["builder"] / totals["total"] * 100)))
			average["builder"] = 0;
		if (!(average["fixer"] = Math.floor(totals["fixer"] / totals["total"] * 100)))
			average["fixer"] = 0;
		if (!(average["total"] = totals["total"]))
		    average["total"] = 0;
		return(average);
	},

	getRoleToSpawn: function(currentAverages){
		for (var i in currentAverages){
			console.log(currentAverages[i])
		}
		if (currentAverages["harvester"] < percentLoadout["harvester"]) {
			return ("harvester");
		}
		else if (currentAverages["upgrader"] < percentLoadout["upgrader"]){
			return ("upgrader");
		}
		else if (currentAverages["builder"] < percentLoadout["builder"]){
			return("builder");
		}
		else if (currentAverages["fixer"] < percentLoadout["fixer"]){
			return ("fixer");
		}
	//	else{
			//return ("harvester")
		//}
	},

	addBodyParts: function(loadout, role, creepAllowance){
		var parts = bodyPartAddons[role];
		var part = null;

		creepAllowance -= 300;
		while (creepAllowance >= 50){
			part = parts[Math.floor((Math.random() * parts.length))];
			if (BODYPART_COST[part] <= creepAllowance){
				loadout.push(part);
				creepAllowance -= BODYPART_COST[part];
			}
		}
		return;
	}
}