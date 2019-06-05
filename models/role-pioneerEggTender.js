var rolePioneerEggTender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const looseEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
	    const mainStorage = creep.room.find(FIND_STRUCTURES, {
	       filter: (structure) => {
	           return structure.structureType == STRUCTURE_STORAGE &&
	           structure.store[RESOURCE_ENERGY];
	       }
	   })
	       // const mainTerminal = creep.room.find(FIND_STRUCTURES, {
	       //     filter: (structure) => {
	       //         return structure.structureType == STRUCTURE_TERMINAL &&
	       //         structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
	       //     }
	       // })
	       // const mainLabs = creep.room.find(FIND_STRUCTURES, {
	       //     filter: (structure) => {
	       //         return structure.structureType == STRUCTURE_LAB &&
	       //         structure.energy < structure.energyCapacity;
	       //     }
	       // })

    var extensions = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ) &&
                structure.energy < structure.energyCapacity;
        }
    });
                
    const sourceContainers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER) &&
            (structure.store[RESOURCE_ENERGY] >= creep.carryCapacity - creep.carry.energy) &&
            (structure.id !== '5cd6a892e414c27d69354bf1' && structure.id !== '5ce8c173f6835b34054a9de2' && structure.id !== '5cc268da770d0403189fb47a')
        }
    })
    if (creep.carry.energy < 50 || creep.carry[RESOURCE_HYDROGEN] < 50) {
        if (looseEnergy.length > 0) {
            end = looseEnergy.length-1
	        if(creep.pickup(looseEnergy[end], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(looseEnergy[end], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } 
        else 
        if (sourceContainers.length > 0 && creep.carry.energy < 50 ) {
            if(creep.withdraw(sourceContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sourceContainers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else if(mainStorage.length > 0 && creep.carry.energy < 50 && extensions.length > 0) {
	        if(creep.withdraw(mainStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mainStorage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
    else if (extensions.length > 0) {
        if(creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(extensions[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else {
        if (creep.carry.energy > 0 ) {
            if(creep.transfer(mainStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mainStorage[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
        creep.moveTo(mainStorage[0].pos.x - 1, mainStorage[0].pos.y)
        }
    }
    }
};

module.exports = rolePioneerEggTender;