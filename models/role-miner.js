var roleMiner = {
    
    run: function(creep) {
        creep.moveTo(5,29)
        const links = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return structure.structureType == STRUCTURE_LINK
            }
        })

        if(creep.carry.energy == creep.carryCapacity && links[1].energy == links[1].energyCapacity) {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(5, 29, {visualizePathStyle: {stroke: '#ffaa00'}});
            }            
        }
        if (creep.carry.energy == creep.carryCapacity) {
            if (links[1].energy < links[1].energyCapacity && creep.carry.energy == creep.carryCapacity) {
                if(creep.transfer(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(links[1])
                }
            }
        } else {
            const sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(5, 29, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
        }
    }
};

module.exports = roleMiner;