/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roleBase');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
    decideWhatToDo: function(creep){
		//If the creep has dropped off its load, we switch to "not working"
        if (creep.memory.working == true && creep.carry.energy == 0)
            creep.memory.working = false;
		// If the creep has filled its carry capacity, it will "work" and drop off its load.
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity)
            creep.memory.working = true; 
    }
};