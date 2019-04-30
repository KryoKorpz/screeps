var rolePioneerBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
        const towers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER &&
                structure.energy < structure.energyCapacity-300;
            }
        })
        if( constructionSites.length > 0 && creep.carry.energy > 50) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else if(towers.length > 0 && creep.carry.energy > 50) {
            creep.memory.role = 'pioneerTower'
        } else {
            creep.memory.role = 'pioneerWorker'
        }
	}
};

module.exports = rolePioneerBuilder;