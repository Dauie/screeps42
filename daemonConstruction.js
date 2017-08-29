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
	}

};