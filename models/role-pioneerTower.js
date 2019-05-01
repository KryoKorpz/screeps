var rolePioneerTower = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const towers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER &&
                structure.energy < structure.energyCapacity-300;
            }
        })        
        if( towers.length > 0 && creep.carry.energy > 50) {
            if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            creep.memory.role = 'pioneerWorker'
        }
	}
};

module.exports = rolePioneerTower;