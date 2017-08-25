
var peaceTimeEarlyBuild = {};
	peaceTimeEarlyBuild["harvesters"] = 0.6;
	peaceTimeEarlyBuild["upgraders"] = 0.2;
	peaceTimeEarlyBuild["builders"] = 0.1;
	peaceTimeEarlyBuild["fixers"] = 0.1;

var totalCreeps = {};
	totalCreeps["harvesters"] = 0;
	totalCreeps["upgraders"] = 0;
	totalCreeps["builders"] = 0;
	totalCreeps["fixers"] = 0;
	totalCreeps["total"] = 0;

var creepMins = {};
	creepMins["harvesters"] = 10;
	creepMins["upgraders"] = 2;



module.exports = {

	getAverage: function(){
		
		//clear average dictionary.
		for (var i in totalCreeps){
			totalCreeps[i] = 0;
		}

		//initalize our average return variable.
		var average = {};

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
		average["harvesters"] = Math.floor(totalCreeps["harvesters"] / totalCreeps["total"] * 100);
		average["upgraders"] = Math.floor(totalCreeps["upgraders"] / totalCreeps["total"] * 100);
		average["builders"] = Math.floor(totalCreeps["builders"] / totalCreeps["total"] * 100);
		average["fixers"] = Math.floor(totalCreeps["fixers"] / totalCreeps["total"] * 100);
		console.log(average["harvesters"]);
		console.log(totalCreeps["total"])
		return(average);
	},

	run: function(){
		var spawnLoadout = {};
		spawnLoadout = peaceTimeEarlyBuild;
		var averages = {};
		averages = this.getAverage();
		if (averages["harvesters"] < spawnLoadout["harvesters"] || totalCreeps["harvesters"] < creepMins["harvesters"]){
			Game.spawns.spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'harvester', working: false});
		}
		else if (averages["upgraders"] < spawnLoadout["upgraders"]){
			Game.spawns.spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader', working: false});
		}
		else if (averages["builders"] < spawnLoadout["builders"]){
			Game.spawns.spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder', working: false});
		}
		else if (averages["fixers"] < spawnLoadout["fixers"]){
			Game.spawns.spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'fixer', working: false})
		}
		else {
			Game.spawns.spawn.createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester', working: false});
		}
	},
	
	
}