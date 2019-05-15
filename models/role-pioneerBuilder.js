var rolePioneerBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)

        if( constructionSites.length > 0 && creep.carry.energy > 0) {
            if(creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSites[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            creep.memory.role = 'pioneerWorker'
        }
	}
};

module.exports = rolePioneerBuilder;