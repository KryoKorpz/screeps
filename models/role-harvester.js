var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        const locatedTombstones = creep.room.find(FIND_TOMBSTONES);
        const looseEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
        const sourceTombs = []
        const looseEnergyToPickUp = []
        if(locatedTombstones.length > 0) {
            for(let i = 0; i < locatedTombstones.length; i++) {
                if(locatedTombstones[i].store[RESOURCE_ENERGY] != 0){
                    sourceTombs.push(locatedTombstones[i])
                    }
                }
            }
        if(looseEnergy.length > 0) {
            for(let i = 0; i < looseEnergy.length; i++) {
                if(looseEnergy[i].energy > 50){
                    looseEnergyToPickUp.push(looseEnergy[i])
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
                const avg1 = container1[0].store[RESOURCE_ENERGY] / container1[0].storeCapacity
                const avg2 = container2[0].store[RESOURCE_ENERGY] / container2[0].storeCapacity
        if(sourceTombs.length > 0) {
            if(creep.withdraw(sourceTombs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourceTombs[0], {visualizePathStyle: {stroke: '##0000FF'}})
            }
        }
        else if(looseEnergyToPickUp.length > 0 && container2[0].store[RESOURCE_ENERGY] != container2[0].storeCapacity) {
            if(creep.pickup(looseEnergyToPickUp[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(looseEnergyToPickUp[0], {visualizePathStyle: {stroke: '##0000FF'}})
            }
        }

                else if (avg1 > avg2) {
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
            let storageContainers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE ) || 
                    (structure.id == '5cc2bc58734ecc60941c0d56') &&
                    structure.store[RESOURCE_ENERGY] != structure.storeCapacity
                }
            })
            var extensions = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ) &&
                            structure.energy < structure.energyCapacity;
                    }
                });

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

module.exports = roleHarvester;