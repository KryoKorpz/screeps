var roleEHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	        const mainStorage = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return structure.structureType == STRUCTURE_STORAGE &&
	                structure.store[RESOURCE_ENERGY];
	            }
	        })
            var extensions = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ) &&
                            structure.energy < structure.energyCapacity;
                    }
                });

	        if(mainStorage.length > 0 && creep.carry.energy < 50) {
	               if(creep.withdraw(mainStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(mainStorage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
    } else {
        end = extensions.length -1
                if(creep.transfer(extensions[end], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(extensions[end], {visualizePathStyle: {stroke: '#ffffff'}});
                }
    }
    }
};

module.exports = roleEHarvester;