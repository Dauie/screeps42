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
			if (Game.rooms[rooms[i]].controller.level > 2){
				var currentRoom = rooms[i];
				var spawns = Game.rooms[currentRoom].find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN})
				var sources = Game.rooms[currentRoom].find(FIND_SOURCES);
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
				for (var s of sources){
					var x = s.pos.x;
					var y = s.pos.y;
					Game.rooms[currentRoom].createConstructionSite(x, y - 3, STRUCTURE_EXTENSION);
					Game.rooms[currentRoom].createConstructionSite(x, y - 4, STRUCTURE_EXTENSION);
					Game.rooms[currentRoom].createConstructionSite(x + 1, y - 4, STRUCTURE_EXTENSION);
					Game.rooms[currentRoom].createConstructionSite(x - 1, y - 4, STRUCTURE_EXTENSION)
				}
			}
		}
	},
	//need to work on this.

	makeTurrets: function(){

	},

	makeOptimalRoads: function(){
		rooms = toolsWorld.getControlledRooms();
			for (var room of rooms){
				
				//Locate our spawns, controllers, and resources for a room.
				var spawns = toolsWorld.getSpawns(room);
				var controller = Game.rooms[room].controller;
				var resources = toolsWorld.getResources(room);
                
                //Make paths around our spawn.
                for (var spawn of spawns){
                    Game.rooms[room].createConstructionSite(spawn.pos.x + 1, spawn.pos.y, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(spawn.pos.x - 1, spawn.pos.y, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(spawn.pos.x, spawn.pos.y + 1, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(spawn.pos.x, spawn.pos.y - 1, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(spawn.pos.x + 1, spawn.pos.y + 1, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(spawn.pos.x - 1, spawn.pos.y - 1, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(spawn.pos.x + 1, spawn.pos.y - 1, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(spawn.pos.x - 1, spawn.pos.y + 1, STRUCTURE_ROAD);
                    //Game.rooms[room].createConstructionSite(path[i][spots].x + 1, path[i][spots].y, STRUCTURE_ROAD);    
				}
				
				//Make roads around our resources
				for (var rec of resources){
                    Game.rooms[room].createConstructionSite(rec.pos.x + 1, rec.pos.y, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(rec.pos.x - 1, rec.pos.y, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(rec.pos.x, rec.pos.y + 1, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(rec.pos.x, rec.pos.y - 1, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(rec.pos.x + 1, rec.pos.y + 1, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(rec.pos.x - 1, rec.pos.y - 1, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(rec.pos.x + 1, rec.pos.y - 1, STRUCTURE_ROAD);
                    Game.rooms[room].createConstructionSite(rec.pos.x - 1, rec.pos.y + 1, STRUCTURE_ROAD);
				}
				console.log(controller.pos)
				//make roads around our controller
                Game.rooms[room].createConstructionSite(controller.pos.x + 1, controller.pos.y, STRUCTURE_ROAD);
                Game.rooms[room].createConstructionSite(controller.pos.x - 1, controller.pos.y, STRUCTURE_ROAD);
               	Game.rooms[room].createConstructionSite(controller.pos.x, controller.pos.y + 1, STRUCTURE_ROAD);
                Game.rooms[room].createConstructionSite(controller.pos.x, controller.pos.y - 1, STRUCTURE_ROAD);
                Game.rooms[room].createConstructionSite(controller.pos.x + 1, controller.pos.y + 1, STRUCTURE_ROAD);
                Game.rooms[room].createConstructionSite(controller.pos.x - 1, controller.pos.y - 1, STRUCTURE_ROAD);
                Game.rooms[room].createConstructionSite(controller.pos.x + 1, controller.pos.y - 1, STRUCTURE_ROAD);
                Game.rooms[room].createConstructionSite(controller.pos.x - 1, controller.pos.y + 1, STRUCTURE_ROAD);

                //Make roads from resources to spawns
				for (var source of resources){
					for (var spawn of spawns){
						var path = PathFinder.search(source.pos, spawn.pos);
						for (var i in path){
							for (var spots in path[i]){
								Game.rooms[room].createConstructionSite(path[i][spots], STRUCTURE_ROAD);
								Game.rooms[room].createConstructionSite(path[i][spots].x + 1, path[i][spots].y, STRUCTURE_ROAD);
							}
						}
					}
				}
				
				//Make roads from spawn to controller
				for (var spawn of spawns){
					var path = PathFinder.search(spawn.pos, Game.rooms[room].controller.pos)
					for (var i in path){
						for (var spot in path[i]){
							Game.rooms[room].createConstructionSite(path[i][spot], STRUCTURE_ROAD);
							Game.rooms[room].createConstructionSite(path[i][spot].x + 1, path[i][spot].y, STRUCTURE_ROAD);
						}
					}
				}
				
			}
		},

	autoRoads: function(creep){
		var road = creep.pos.findInRange(FIND_STRUCTURES, {
			filter: (s) => ((s.structureType == STRUCTURE_ROAD) &&
			s.energy < s.energyCapacity)
		}, 2);
		if (road.length > 0)
        	creep.pos.createConstructionSite(STRUCTURE_ROAD);
        // else
        //      creep.say("no build");
	},
};