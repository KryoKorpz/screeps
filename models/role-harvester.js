var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        const locatedTombstones = creep.room.find(FIND_TOMBSTONES);
        const looseEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
        if(locatedTombstones.length > 0) {
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
                if(container1[0].store[RESOURCE_ENERGY] >= 1000 && container1[0].store[RESOURCE_ENERGY] > container2[0].store[RESOURCE_ENERGY]) {
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
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
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
    }
};

module.exports = roleHarvester;