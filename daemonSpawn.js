var toolsWorld = require('toolsWorld');

//decide on better mins, and a better method of deciding on what to spawn.
const creepsMinEarly = {
	"harvesters": 8,
	"upgraders": 1,
	"builders": 4,
	"fixers": 3
}

const creepsMinMid = {
	"harvesters": 7,
	"upgraders": 2,
	"builders": 2,
	"fixers": 2,
	"scavenger": 1
}

//Population percentage loadouts
const earlyPeacePercent = {
	"harvesters": 40,
	"upgraders": 20,
	"builders": 20,
	"fixers": 20
}
	
//Loadouts
const earlyPeaceCreeps = {

	"harvesters": [WORK, CARRY, CARRY, CARRY, MOVE],
	"upgraders": [WORK, CARRY, CARRY, MOVE, MOVE],
	"builders": [WORK, CARRY, CARRY, MOVE, MOVE],
	"fixers": [WORK, CARRY, MOVE, MOVE, MOVE],
	"soldiers": [MOVE, MOVE, ATTACK, ATTACK, TOUGH, TOUGH],
	"archers": [MOVE, MOVE, RANGED_ATTACK, TOUGH, TOUGH]
}

const midPeaceCreeps = {
	"harvesters": [WORK, WORK, CARRY, CARRY, CARRY, MOVE],
	"upgraders": [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
	"builders": [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
	"fixers": [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
	"scavengers": [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
	"soldiers": [MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH],
	"archers": [MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH]
}

var totalCreeps = {};

module.exports = {

	run: function(){

		var percentLoadout = earlyPeacePercent;
		var currentAverages = this.getAverage();
		var minLoadout = {};
		var creepLoadout = {};
		//decide on which creep loaout we want.		
		const rooms = toolsWorld.getControlledRooms();
		if (toolsWorld.getExtensionAmount(rooms[0]) < 6){
			creepLoadout = earlyPeaceCreeps;
			minLoadout = creepsMinEarly;
		}
		else {
			creepLoadout = midPeaceCreeps;
			minLoadout = creepsMinMid;
		}

		//decide on which min needs to be used

//		Debugging population
		for(var i in currentAverages){
			console.log(i, currentAverages[i]);
		}
	
		//Spawn/Manage Population
		if (totalCreeps["harvesters"] < minLoadout["harvesters"] || currentAverages["harvesters"] < percentLoadout["harvesters"]) {
			Game.spawns.spawn.createCreep(creepLoadout["harvesters"], undefined, {role: 'harvester', designer: false, working: false});
		}
		else if (totalCreeps["upgraders"] < minLoadout["upgraders"] || currentAverages["upgraders"] < percentLoadout["upgraders"]){
			Game.spawns.spawn.createCreep(creepLoadout["upgraders"], undefined, {role: 'upgrader', designer: false,  working: false});
		}
		else if (totalCreeps["builders"] < minLoadout["builders"] ||currentAverages["builders"] < percentLoadout["builders"]){
			Game.spawns.spawn.createCreep(creepLoadout["builders"], undefined, {role: 'builder', working: false});
		}
		else if (totalCreeps["fixers"] < minLoadout["fixers"] || currentAverages["fixers"] < percentLoadout["fixers"]){
			Game.spawns.spawn.createCreep(creepLoadout["fixers"], undefined, {role: 'fixer', working: false});
		}
		else if (totalCreeps["scavengers"] < minLoadout["scavengers"] || currentAverages["scavengers"] < percentLoadout["scavengers"]){
			Game.spawns.spawn.createCreep(creepLoadout["scavengers", undefined, {role: 'scavenger', working: false, homeRoom: undefined , targetRoom: undefined}])
		}
		else
			Game.spawns.spawn.createCreep(creepLoadout["harvesters"], undefined, {role: 'harvester', designer: false, working: false});
	},

	getAverage: function(){
		var average = {};

		//clear average dictionary.
		for (var i in totalCreeps){
			totalCreeps[i] = 0;
		}

		//designate a designer for roads.
		if (this.hasDesigner('harvester') == false)
			this.designateDesigner('harvester');
		if (this.hasDesigner('upgrader') == false)
			this.designateDesigner('upgrader');
		
		//count our creeps.
		for(var i in Game.creeps) {
			if(Game.creeps[i].memory.role == 'harvester') {
				totalCreeps["harvesters"] += 1;
			}
			else if (Game.creeps[i].memory.role == 'upgrader'){
				totalCreeps["upgraders"] += 1;
			}
			else if (Game.creeps[i].memory.role == 'builder'){
				totalCreeps["builders"] += 1;
			}
			else if (Game.creeps[i].memory.role == 'fixer'){
				totalCreeps["fixers"] += 1;
			}
			totalCreeps["total"] += 1;
		}
			
			//calculate averages and return.
		if (!(average["harvesters"] = Math.floor(totalCreeps["harvesters"] / totalCreeps["total"] * 100)))
			average["harvesters"] = 0;
		if (!(average["upgraders"] = Math.floor(totalCreeps["upgraders"] / totalCreeps["total"] * 100)))
			average["upgraders"] = 0;
		if (!(average["builders"] = Math.floor(totalCreeps["builders"] / totalCreeps["total"] * 100)))
			average["builders"] = 0;
		if (!(average["fixers"] = Math.floor(totalCreeps["fixers"] / totalCreeps["total"] * 100)))
			average["fixers"] = 0;
		average["total"] = totalCreeps["total"];
		return(average);
	},
	
	//If we found a role without a designer, we will 
	designateDesigner: function(type){
		for (var i in Game.creeps){
			if (Game.creeps[i].memory.role == type){
				Game.creeps[i].memory.designer = true;
					return;
			}
		}
	},
	
	//Check's type given for a designated designer, returns a bool.
	hasDesigner: function(type){
		for (var i in Game.creeps){
			if (Game.creeps[i].role == type && Game.creeps.designer == true)
				return (true)
		}
		return (false);
	},
}
