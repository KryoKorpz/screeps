var rolePioneerUpgradeRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {
	        const mainStorage = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return structure.structureType == STRUCTURE_STORAGE &&
	                structure.store[RESOURCE_ENERGY];
	            }
	        })
	        const upgradeContainer = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return (structure.structureType == STRUCTURE_CONTAINER) &&
	                (structure.id == '5cd6a892e414c27d69354bf1' || structure.id == '5ce8c173f6835b34054a9de2' || structure.id == '5cc268da770d0403189fb47a')
	            }
	        })
            if(mainStorage.length > 0 && creep.carry.energy < 50) {
	            if(creep.withdraw(mainStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mainStorage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } 
            else {
                if(creep.transfer(upgradeContainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(upgradeContainer[0], {visualizePathStyle: {stroke: '#ffaa00'}})
                }
                
            }
        
    }
};

module.exports = rolePioneerUpgradeRunner;