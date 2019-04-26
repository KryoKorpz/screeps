var roleUpgradeRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
            } else {
                    const roomContainers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER) &&
                                (structure.store[RESOURCE_ENERGY] <= structure.storeCapacity-300) &&
                                structure.id != '5cc185d42bc4d56965660444' && structure.id != '5cc1495d9ae56330f9f33526'
                        }
                    });
                    if(roomContainers.length > 0) {
                        if(creep.transfer(roomContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roomContainers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else {
                        const roomStorage = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE) &&
                                    structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                            }
                        });
                        if(creep.transfer(roomStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(roomStorage[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
};

module.exports = roleUpgradeRunner;