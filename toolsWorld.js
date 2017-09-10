/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('toolsWorld');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
    getControlledRooms: function(){
		var roomList = [];

		for (var i in Game.rooms){
			if (Game.rooms[i].controller && Game.rooms[i].controller.my == true){
			    if (roomList.includes(i) == false)
				    roomList.push(i);
			}
		}
		return roomList;
	},

	getSpawns: function(room){
		var spawns = Game.rooms[room].find(FIND_MY_STRUCTURES, {
			filter: {structureType: STRUCTURE_SPAWN}})
		return (spawns);
	},

	getController: function(room){
		var controller = Game.rooms[room].find(FIND_MY_STRUCTURES, {
			filter: {structureType: STRUCTURE_CONTROLLER}})
		return (controller);
	},

	getResources: function(room){
		var resources = Game.rooms[room].find(FIND_SOURCES);
		return (resources);
	},

	getExtensionAmount: function(room){
		var extensions = Game.rooms[room].find(FIND_MY_STRUCTURES, {
			filter: {structureType: STRUCTURE_EXTENSION}
		});
		return (extensions.length);
	},

	getContainerAmount: function(room){
		var containers = Game.rooms[room].find(FIND_MY_STRUCTURES, {
			filter: {structureType: STRUCTURE_CONTAINER}
		});
		return (containers.length);		
	},

	//Use Game.rooms[room].name
	getCreepsByRoom: function(room){
		creeps = [];
		for (var i in Game.creeps){
			if (Game.creeps[i].pos.roomName == room){
				creeps.push(Game.creeps[i]);
			}	
		}
		return (creeps);
	},

	clearMemory: function(){
		for(let i in Memory.creeps){
			if (Game.creeps[i] == undefined){
				delete Memory.creeps[i]
			}
		}
	},

};