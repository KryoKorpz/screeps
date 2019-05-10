var roleUpgradeRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {
	        const mainStorage = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return structure.structureType == STRUCTURE_STORAGE &&
	                structure.store[RESOURCE_ENERGY];
	            }
	        })
	        
	        const upgradeContainer = Game.getObjectById('5cc268da770d0403189fb47a')
            if(mainStorage.length > 0 && creep.carry.energy < 50) {
	            if(creep.withdraw(mainStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mainStorage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
            else {
                if(creep.transfer(upgradeContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(upgradeContainer, {visualizePathStyle: {stroke: '#ffaa00'}})
                }
                
            }
        
    }
    // run: function(creep) {
	   // if(creep.carry.energy < 50) {
    //             const container1 = creep.room.find(FIND_STRUCTURES, {
    //                 filter:(structure) => {
    //                     return (structure.structureType == STRUCTURE_CONTAINER) &&
    //                     (structure.id == '5cc185d42bc4d56965660444') 
    //                     }
    //             })
    //             const container2 = creep.room.find(FIND_STRUCTURES, {
    //                 filter:(structure) => {
    //                     return (structure.structureType == STRUCTURE_CONTAINER) &&
    //                     (structure.id == '5cc1495d9ae56330f9f33526')
    //                     }
    //             })
    //             if(container1[0].store[RESOURCE_ENERGY] >= 1000 && container1[0].store[RESOURCE_ENERGY] > container2[0].store[RESOURCE_ENERGY]) {
    //                 if(creep.withdraw(container1[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                     creep.moveTo(container1[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    //                 }
    //             } else {
    //                 {
    //                     if(creep.withdraw(container2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                         creep.moveTo(container2[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    //                     }
    //                 }
    //             }
    //         } else {
    //                 const roomContainers = creep.room.find(FIND_STRUCTURES, {
    //                     filter: (structure) => {
    //                         return (structure.structureType == STRUCTURE_CONTAINER) &&
    //                             (structure.store[RESOURCE_ENERGY] <= structure.storeCapacity-300) &&
    //                             structure.id != '5cc185d42bc4d56965660444' && structure.id != '5cc1495d9ae56330f9f33526'
    //                     }
    //                 });
    //                 if(roomContainers.length > 0) {
    //                     if(creep.transfer(roomContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                     creep.moveTo(roomContainers[0], {visualizePathStyle: {stroke: '#ffffff'}});
    //                     }
    //                 } else {
    //                     const roomStorage = creep.room.find(FIND_STRUCTURES, {
    //                         filter: (structure) => {
    //                             return (structure.structureType == STRUCTURE_STORAGE) &&
    //                                 structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
    //                         }
    //                     });
    //                     if(creep.transfer(roomStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                         creep.moveTo(roomStorage[0], {visualizePathStyle: {stroke: '#ffffff'}});
    //                     }
    //                 }
    //             }
    //         }
};

module.exports = roleUpgradeRunner;