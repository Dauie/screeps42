
var peaceTimeEarlyBuild = {};
	peaceTimeEarlyBuild["harvesters"] = 40;
	peaceTimeEarlyBuild["upgraders"] = 40;
	peaceTimeEarlyBuild["builders"] = 10;
	peaceTimeEarlyBuild["fixers"] = 10;

var warTimeEarlyBuild = {}
	
var totalCreeps = {};
var average = {};
//decide on better mins, and a better method of deciding on what to spawn.
var creepsMin = {};
	creepsMin["harvesters"] = 7;
module.exports = {

	getAverage: function(){
		
		//clear average dictionary.
		for (var i in totalCreeps){
			totalCreeps[i] = 0;
		}

		//initalize our average return variable.
		
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
			totalCreeps["total"] +=1;
		}
		//calculate averages and return.
		average["harvesters"] = Math.floor(totalCreeps["harvesters"] / totalCreeps["total"] * 100);
		average["upgraders"] = Math.floor(totalCreeps["upgraders"] / totalCreeps["total"] * 100);
		average["builders"] = Math.floor(totalCreeps["builders"] / totalCreeps["total"] * 100);
		average["fixers"] = Math.floor(totalCreeps["fixers"] / totalCreeps["total"] * 100);
		average["total"] = totalCreeps["total"];
		
		//keep your eyes on it.
		for (var i in totalCreeps)
			console.log(i, totalCreeps[i]);

		return(average);
	},

	run: function(){
		var spawnLoadout = {};
		spawnLoadout = peaceTimeEarlyBuild;
		var averages = {};
		averages = this.getAverage();
	
		Memory.roleAverages = averages;
		if (averages["harvesters"] < spawnLoadout["harvesters"] || totalCreeps["harvesters"] < creepsMin["harvesters"]) {
			Game.spawns.spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester', working: false});
		}
		else if (averages["upgraders"] < spawnLoadout["upgraders"]){
			Game.spawns.spawn.createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'upgrader', working: false});
		}
		else if (averages["builders"] < spawnLoadout["builders"]){
			Game.spawns.spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder', working: false});
		}
		else if (averages["fixers"] < spawnLoadout["fixers"]){
			Game.spawns.spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'fixer', working: false})
		}
		//else {
			//Game.spawns.spawn.createCreep([WORK, CARRY, CARRY, MOVE], undefined, {role: 'harvester', working: false});
		//}
	},
	
	
}