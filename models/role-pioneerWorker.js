var rolePioneerWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const sources = creep.room.find(FIND_SOURCES);

        const extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                        return (structureType == STRUCTURE_SPAWN || structureType == STRUCTURE_EXTENSIONS) &&
                        structure.energy < structure.energyCapacity;
                }
        });

        const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)

        const towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER &&
                    structure.energy < structure.energyCapacity-300;
                }
            })

        if(creep.carry.energy < 50){
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(5, 29, {visualizePathStyle: {stroke: '#ffaa00'}});
                }  
        } else {
                if(extensions.length > 0) {
                        if(creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(extensions[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                } else if ( constructionSites.length > 0) {
                        creep.memory.role = 'pioneerBuilder'
                } else if ( towers.length > 0){
                        creep.memory.role = 'pioneerTower'
                }
        }

        }

};

module.exports = rolePioneerWorker;
