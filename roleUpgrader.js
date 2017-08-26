//Game.spawns.spawn.createCreep([WORK,CARRY,MOVE,MOVE])
var daemonRoads = require('daemonRoads');
var roleBase = require('roleBase');
module.exports = {
    
    run: function(creep){
        //decide if we need to change the working status or not.
		roleBase.decideWhatToDo(creep);

        //(may be removed) If the upgrader is near spawn and has low TTL, try and renew.
        if (creep.ticksToLive < 200 && creep.memory.working == false){
		    if (Game.spawns.spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
		        creep.moveTo(Game.spawns.spawn)
		    }
        }
        
        //Now, Either we're "working":upgrading the controller, or we are "Not working": heading back to get resources.
        if (creep.memory.working == true) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				//while on the way, create roads.
				if (creep.memory.designer == true)
					daemonRoads.autoRoads(creep);
                creep.moveTo(creep.room.controller);
            }
        }
        else {
			this.findResource(creep);
            //inefficient.. need to find a better way of summing up possible resources.
            //below we will sum up possible resources(dropped energy or resources) and to the closest.

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
		source = null;
		targets = null;
		droppedResources = null;
		staticResources = null;
		}
	}
};