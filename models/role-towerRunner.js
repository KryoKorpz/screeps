var roleTowerRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        const locatedTombstones = creep.room.find(FIND_TOMBSTONES);
        if(locatedTombstones.length) {
            for(let i = 0; i < locatedTombstones.length; i++) {
                if(locatedTombstones[i].store[RESOURCE_ENERGY] > 0){
                    const range = creep.pos.getRangeTo(locatedTombstones[i]);
                    if(range <= 5) {
                        if(creep.withdraw(locatedTombstones[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(locatedTombstones[i], {visualizePathStyle: {stroke: '##0000FF'}})
                        }
                    }
                }
            }
        }
	    if(creep.carry.energy < 50) {
                const halfFullRoomContainers = creep.room.find(FIND_STRUCTURES, {
                    filter:(structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                        (structure.id == '5cc185d42bc4d56965660444') ||
                        (structure.id == '5cc1495d9ae56330f9f33526') &&
                        (1000 < structure.store[RESOURCE_ENERGY] )
                        }
                })
                const roomContainers = creep.room.find(FIND_STRUCTURES, {
                    filter:(structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                        (300 <= structure.store[RESOURCE_ENERGY] >= 1000 ) && 
                        (structure.id == '5cc185d42bc4d56965660444') ||
                        (structure.id == '5cc1495d9ae56330f9f33526')
                        }
                })
                if(halfFullRoomContainers.length > 0) {
                    if(creep.withdraw(halfFullRoomContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(halfFullRoomContainers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    if(roomContainers.length > 0) {
                        if(creep.withdraw(roomContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(roomContainers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
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

            var towerTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(towerTargets.length > 0) {
                if(creep.transfer(towerTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towerTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
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