//decide on better mins, and a better method of deciding on what to spawn.
const creepsMinEarly = {
	"harvesters": 5,
	"upgraders": 2,
	"builders": 2,
	"fixers": 1
}

const creepsMinMid = {
	"harvesters": 4,
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
	"harvesters": [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE],
	"upgraders": [WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
	"builders": [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
	"fixers": [WORK, WORK,CARRY, CARRY, MOVE, MOVE]	
}

var totalCreeps = {};

module.exports = {



	run: function(){

		var percentLoadout = earlyPeacePercent;
		var currentAverages = this.getAverage();
		var creepLoadouts = earlyPeaceCreeps;
		//population debugging
		// for(var i in currentAverages){
		// 	console.log(i, currentAverages[i]);
		// }
		// for (var i in percentLoadout){
		// 	console.log(i, percentLoadout[i]);
		// }
		var rooms = this.getControlledRooms();
		for (var i in rooms){
			console.log(i, rooms[i]);
		}
		//Spawn/Manage Population
		if (totalCreeps["harvesters"] < creepsMinEarly["harvesters"] ||currentAverages["harvesters"] < percentLoadout["harvesters"]) {
			Game.spawns.spawn.createCreep(creepLoadouts["harvesters"], undefined, {role: 'harvester', designer: false, working: false});
		}
		else if (totalCreeps["upgraders"] < creepsMinEarly["upgraders"] || currentAverages["upgraders"] < percentLoadout["upgraders"]){
			Game.spawns.spawn.createCreep(creepLoadouts["upgraders"], undefined, {role: 'upgrader', designer: false,  working: false});
		}
		else if (totalCreeps["builders"] < creepsMinEarly["builders"] ||currentAverages["builders"] < percentLoadout["builders"]){
			Game.spawns.spawn.createCreep(creepLoadouts["builders"], undefined, {role: 'builder', working: false});
		}
		else if (totalCreeps["fixers"] < creepsMinEarly["fixers"] || currentAverages["fixers"] < percentLoadout["fixers"]){
			Game.spawns.spawn.createCreep(creepLoadouts["fixers"], undefined, {role: 'fixer', working: false});
		}
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

	designateDesigner: function(type){
		for (var i in Game.creeps){
			if (Game.creeps[i].memory.role == type){
				Game.creeps[i].memory.designer = true;
					return;
			}
		}
	},

	hasDesigner: function(type){
		for (var i in Game.creeps){
			if (Game.creeps[i].role == type && Game.creeps.designer == true)
				return (true)
		}
		return (false);
	},

	getControlledRooms: function(){
		var roomList = [];

		for (var i in Game.rooms){
			if (Game.rooms[i].controller && Game.rooms[i].controller.my == true){
				roomList.push(i);
			}
		}
		return roomList;
	},

	getExtensionAmount: function(roomName){
		
	}
	
	
}