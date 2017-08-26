//decide on better mins, and a better method of deciding on what to spawn.
const creepsMin = {
	"harvesters": 7,
	"upgraders": 2,
	"builders": 1,
	"fixers": 1
}

//Population percentage loadouts
const earlyPeacePercent = {
	"harvesters": 60,
	"upgraders": 20,
	"builders": 10,
	"fixers": 10
}
	

//Loadouts
const earlyPeaceCreeps = {
	"harvesters": [WORK, WORK, CARRY, MOVE],
	"upgraders": [WORK, CARRY, CARRY, MOVE],
	"builders": [WORK, CARRY, MOVE, MOVE],
	"fixers": [WORK, CARRY, MOVE, MOVE]	
}

const midPeaceCreeps = {

}

var totalCreeps = {};

module.exports = {

	getAverage: function(){
		var average = {};

		//clear average dictionary.
		for (var i in totalCreeps){
			totalCreeps[i] = 0;
		}

		//initalize our average return variable.
		
		//count our creeps.
		for(var i in Game.creeps) {
			var designHarvester = false;
			var designUpgrader = false;

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
			if (Game.creeps[i].memory.role == 'harvester' && Game.creeps[i].memory.designer == true)
				designHarvester = true;
			if (Game.creeps[i].memory.role == 'upgrader' && Game.creeps[i].memory.designer == true)
				designUpgrader = true;
			if (designHarvester == false)
				this.designateDesigner('harvester');
			if (designUpgrader == false)
				this.designateDesigner('upgrader');
				
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

	run: function(){

		var percentLoadout = earlyPeacePercent;
		var currentAverages = this.getAverage();

		for(var i in currentAverages){
			console.log(i, currentAverages[i]);
		}
		for (var i in percentLoadout){
			console.log(i, percentLoadout[i]);
		}

		if (totalCreeps["harvesters"] < creepsMin["harvesters"] ||currentAverages["harvesters"] < percentLoadout["harvesters"]) {
			Game.spawns.spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester', desginer: false, working: false});
		}
		else if (totalCreeps["upgraders"] < creepsMin["upgraers"] || currentAverages["upgraders"] < percentLoadout["upgraders"]){
			Game.spawns.spawn.createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'upgrader', designer: false,  working: false});
		}
		else if (totalCreeps["builders"] < creepsMin["builders"] ||currentAverages["builders"] < percentLoadout["builders"]){
			Game.spawns.spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder', working: false});
		}
		else if (totalCreeps["fixers"] < creepsMin["fixers"] || currentAverages["fixers"] < percentLoadout["fixers"]){
			Game.spawns.spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'fixer', working: false});
		}
	},

	designateDesigner: function(type){
		for (var i in Game.creeps){
			if (Game.creeps[i].memory.role == type){
				Game.creeps[i].memory.designer = true;
			}
		}
	}
	
	
}