/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('daemonConstruction');
 * mod.thing == 'a thing'; // true
 */
var toolsWorld = require('toolsWorld')

module.exports = {

	autoExtension: function(){
		var rooms = toolsWorld.getControlledRooms();
		for (var i in rooms){
			if (Game.rooms[rooms[i]].controller.level > 2 && Game.time % 42 == 0){
				var currentRoom = rooms[i];
				var spawns = Game.rooms[currentRoom].find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN})
				for (var x of spawns){
					nextSpawn = x.name
					var x = Game.spawns[nextSpawn].pos.x;
					var y = Game.spawns[nextSpawn].pos.y;
					Game.rooms[currentRoom].createConstructionSite(x + 2, y + 2, STRUCTURE_EXTENSION);
			 		Game.rooms[currentRoom].createConstructionSite(x + 2, y - 2, STRUCTURE_EXTENSION);
			 		Game.rooms[currentRoom].createConstructionSite(x - 2, y + 2, STRUCTURE_EXTENSION);
			 		Game.rooms[currentRoom].createConstructionSite(x - 2, y - 2, STRUCTURE_EXTENSION);
					if (Game.rooms[rooms[i]].controller.level > 3){
						Game.rooms[currentRoom].createConstructionSite(x, y + 3, STRUCTURE_EXTENSION);
						Game.rooms[currentRoom].createConstructionSite(x, y - 3, STRUCTURE_EXTENSION);
						Game.rooms[currentRoom].createConstructionSite(x + 3, y, STRUCTURE_EXTENSION);
						Game.rooms[currentRoom].createConstructionSite(x - 3, y, STRUCTURE_EXTENSION);
					}
				}
			}
		}
	},
	//need to work on this.
	makeOptimalRoads: function(){
		rooms = toolsWorld.getControlledRooms();
			for (var room of rooms){
				var spawns = toolsWorld.getSpawns(room);
				const controller = toolsWorld.getController(room);
				var resources = toolsWorld.getResources(room);

				for (var source of resources){
					for (var spawn of spawns){
					var path = PathFinder.search(source.pos, spawn.pos)
						for (var i in path){
							for (var spots in path[i]){
								Game.rooms[room].createConstructionSite(path[i][spots], STRUCTURE_ROAD);
							}
						}
					}
				}
				for (var spawn of spawns){
					var path = PathFinder.search(spawn.pos, Game.rooms[room].controller.pos)
					for (var i in path){
						for (var spot in path[i]){
							Game.rooms[room].createConstructionSite(path[i][spot], STRUCTURE_ROAD);
						}
					}
				}
			}
		},

	autoRoads: function(creep){
		var road = creep.pos.findInRange(FIND_STRUCTURES, {
			filter: (s) => ((s.structureType == STRUCTURE_ROAD) &&
			s.energy < s.energyCapacity)
		}, 1);
		if (road.length > 0)
        	creep.pos.createConstructionSite(STRUCTURE_ROAD);
        // else
        //      creep.say("no build");
	},
};