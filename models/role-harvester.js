var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        const locatedTombstones = creep.room.find(FIND_TOMBSTONES);
        if(locatedTombstones.length) {
            for(let i = 0; i < locatedTombstones.length; i++) {
                const range = creep.pos.getRangeTo(locatedTombstones[i]);
                if(range <= 5) {
                    if(creep.withdraw(locatedTombstones[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(locatedTombstones[i], {visualizePathStyle: {stroke: '##0000FF'}})
                    }
                }
            }
        }
	    if(creep.carry.energy < 50) {
            const roomContainers = creep.room.find(FIND_STRUCTURES, {
                filter:(structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                    (structure.store[RESOURCE_ENERGY] >= 300 ) && structure.id != '5cc1dd1febbabb3564eef1f4'
                }
            })
            if(roomContainers.length > 0) {
                if(creep.withdraw(roomContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roomContainers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
        //     } else {
        //         const roomContainers2 = creep.room.find(FIND_STRUCTURES, {
        //         filter:(structure) => {
        //             return (structure.structureType == STRUCTURE_CONTAINER) &&
        //             (structure.store[RESOURCE_ENERGY] > 0 ) && structure.id != '5cc1dd1febbabb3564eef1f4'
        //             }
        //         })
        //         if(roomContainers2.length > 0) {
        //             if(creep.withdraw(roomContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(roomContainers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //             }
        //         } else {
        //         var sources = creep.room.find(FIND_SOURCES);
        //         if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //         }
        //     }
        // }
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
            }
        }
	}
};

module.exports = roleHarvester;