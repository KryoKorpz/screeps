var rolePioneerRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const sourceContainer = Game.getObjectById('5cc973227680be3b982845d7')
        const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
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
                    filter: object => object.hits < object.hitsMax - 500 &&
                    object.structureType != STRUCTURE_WALL &&
                    object.structureType != STRUCTURE_RAMPART
                });
                targets.sort((a,b) => a.hits - b.hits);
                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
                else if (creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
                    creep.memory.role = 'pioneerWorker'
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
                    creep.memory.role = 'pioneerUpgrader'
                }
    	    } else {
    	        if(sourceContainer.store[RESOURCE_ENERGY] > 200) {
    	           if(creep.withdraw(sourceContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sourceContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                    } else {
    	            var sources = creep.room.find(FIND_SOURCES);
                        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    	                }
    	            }
    	        } else {
    	            creep.memory.role = 'pioneerUpgrader'
    	        }
	        }
        }
    }
}};


module.exports = rolePioneerRepairer;