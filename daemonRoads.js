/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('daemonRoads');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
    harvesterRoads: function(creep){
        const look = creep.pos.look();
        
        look.forEach(function(lookObject) {
            if (lookObject.type == LOOK_STRUCTURES &&
                lookObject[LOOK_STRUCTURES].get) {

                }});
};