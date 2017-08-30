//Game.spawns.spawn.createCreep([WORK,CARRY,MOVE,MOVE])
var daemonConstruction = require('daemonConstruction');
var roleBase = require('roleBase');
module.exports = {
    
    run: function(creep){
        //decide if we need to change the working status or not.
		if (creep.memory.designer == true)
				daemonConstruction.autoRoads(creep);
		roleBase.decideWhatToDo(creep);
        if (creep.memory.working == true) {
			this.upgradeController(creep)
        }
        else {
			this.findResource(creep);
		}
	},

	findResource: function(creep){
		var targets = [];
		var droppedResources = [];
		var staticResources = [];

		if (droppedResources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES))
			targets.push(droppedResources);
		if (staticResources = creep.pos.findClosestByPath(FIND_SOURCES))
			targets.push(staticResources);
		var source = creep.pos.findClosestByPath(targets);
		if (creep.pickup(source) == ERR_NOT_IN_RANGE)
				creep.moveTo(source);
		else{
			if (creep.harvest(source) == ERR_NOT_IN_RANGE)
				creep.moveTo(source);
		}
	},

	upgradeController: function(creep){
		if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller);
		}
	},

};