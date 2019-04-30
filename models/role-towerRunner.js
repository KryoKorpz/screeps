var roleTowerRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < 50) {
                const container1 = creep.room.find(FIND_STRUCTURES, {
                    filter:(structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                        (structure.id == '5cc185d42bc4d56965660444') 
                        }
                })
                const container2 = creep.room.find(FIND_STRUCTURES, {
                    filter:(structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                        (structure.id == '5cc1495d9ae56330f9f33526')
                        }
                })
                if(container1[0].store[RESOURCE_ENERGY] >= 500 && container1[0].store[RESOURCE_ENERGY] > container2[0].store[RESOURCE_ENERGY]) {
                    if(creep.withdraw(container1[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container1[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    {
                        if(creep.withdraw(container2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container2[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                }
            }
        else {
            let storageContainers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE ) || 
                    (structure.id == '5cc2bc58734ecc60941c0d56') &&
                    structure.store[RESOURCE_ENERGY] != structure.storeCapacity
                }
            })
            let extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ) &&
                    structure.energy < structure.energyCapacity
                }
            })

            var towerTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy <= structure.energyCapacity-300;
                    }
            });
            if(towerTargets.length > 0 ) {
                if(creep.transfer(towerTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towerTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if (extensions.length > 0) {
                if(creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(extensions[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                if(creep.transfer(storageContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageContainers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleTowerRunner;