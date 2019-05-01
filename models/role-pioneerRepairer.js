var rolePioneerRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.role == 'pioneerRepairer') {
            if (creep.room.name == 'W25N21') {
                creep.moveTo(new RoomPosition(1,31, 'W24N21'))
            } else {
            if(creep.memory.repairing && creep.carry.energy == 0) {
                creep.memory.repairing = false;
                creep.say('🔄 harvest');
    	    }
    	    
    	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
    	        creep.memory.repairing = true;
    	        creep.say('🛠️ repair');
    	    }
    	    
    	    if(creep.memory.repairing) {
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax - 500
                });
                targets.sort((a,b) => a.hits - b.hits);
                console.log(targets)
                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                } else {
                    creep.memory.role = 'pioneerUpgrader'
                }
    	    } else {
    	        var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
    	    }
                
            }
	    }
    }
};


module.exports = rolePioneerRepairer;