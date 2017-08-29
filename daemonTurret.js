/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('daemonTurret');
 * mod.thing == 'a thing'; // true
 */
 
var toolsWorld = require('toolsWorld');

module.exports = {
    
    run: function() {
        const roomList = toolsWorld.getControlledRooms();
        for (var i in roomList){
            const hostiles = Game.rooms[roomList[i]].find(FIND_HOSTILE_CREEPS);
            const towers = Game.rooms[roomList[i]].find(FIND_MY_STRUCTURES, {
                filter: (s) =>  {
                    return s.structureType === STRUCTURE_TOWER
                }
            });
            if (hostiles){
                towers.forEach((tower) => {
                    tower.attack(hostiles[0])
                })
            }
        }
    }
};