var roleEHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	        const mainStorage = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return structure.structureType == STRUCTURE_STORAGE &&
	                structure.store[RESOURCE_ENERGY];
	            }
	        })
	        const mainTerminal = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return structure.structureType == STRUCTURE_TERMINAL &&
	                structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
	            }
	        })
	        const mainLabs = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return structure.structureType == STRUCTURE_LAB &&
	                structure.energy < structure.energyCapacity;
	            }
	        })
	        
            var extensions = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
                
                const sourceContainers = creep.room.find(FIND_STRUCTURES, {
                    filter:(structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                        (structure.id == '5cc185d42bc4d56965660444') &&
                        (structure.id == '5cc1495d9ae56330f9f33526') &&
                            structure.store[RESOURCE_ENERGY] > 1000;
                        }
                })

            if (sourceContainers.length > 0 && creep.carry.energy < 50) {
                if(creep.withdraw(sourceContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceContainers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if(mainStorage.length > 0 && creep.carry.energy < 50) {
	                    if(creep.withdraw(mainStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(mainStorage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
    }
    else if (extensions.length > 0) {
        end = extensions.length -1
                if(creep.transfer(extensions[end], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(extensions[end], {visualizePathStyle: {stroke: '#ffffff'}});
                }
    }
    else if (mainLabs.length > 0) {
                if(creep.transfer(mainLabs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mainLabs[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
    }
    else if (mainTerminal.length > 0) {
        if(creep.transfer(mainTerminal[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(mainTerminal[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else {
        creep.moveTo(mainStorage[0])
    }
    }
};

module.exports = roleEHarvester;