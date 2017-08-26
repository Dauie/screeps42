/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('daemonRoads');
 * mod.thing == 'a thing'; // true
 */
//STRUCTURE_ROAD

module.exports = {
    
    autoRoads: function(creep){
        creep.pos.createConstructionSite(STRUCTURE_ROAD);
	}
}