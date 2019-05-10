var rolePioneerRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const repairRamparts = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_RAMPART) &&
                    structure.hits <= 25000
            }
        })
        const repairWalls = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_WALL) &&
                    structure.hits <= 25000
            }
        })

        if(creep.memory.role == 'pioneerRepairer') {

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
                    filter: object => object.hits < object.hitsMax *.85 &&
                    object.structureType != STRUCTURE_WALL &&
                    object.structureType != STRUCTURE_RAMPART
                });
                targets.sort((a,b) => a.hits - b.hits);
                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
                else if (repairRamparts.length > 0) {
                    if(creep.repair(repairRamparts[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairRamparts[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
                else if (repairWalls.length > 0) {
                    if(creep.repair(repairWalls[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(repairWalls[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
                else {
                    creep.memory.role = 'pioneerWorker'
                }
    	    } 
    	    else {                    
    	        creep.memory.role = 'pioneerWorker'
            }
    }
}};


module.exports = rolePioneerRepairer;