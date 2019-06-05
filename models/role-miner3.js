var roleMiner3 = {
    
    run: function(creep) {

        creep.moveTo(42,25)
        const links = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return structure.structureType == STRUCTURE_LINK
            }
        })
        // if(creep.carry.energy == creep.carryCapacity && links[0].energy >= links[0].energyCapacity/2) {
        //     const sources = creep.room.find(FIND_SOURCES);
        //     if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(42, 25, {visualizePathStyle: {stroke: '#ffaa00'}});
        //     }            
        // }
        // if (creep.carry.energy == creep.carryCapacity) {
        //     if (links[0].energy < links[0].energyCapacity/2 && creep.carry.energy == creep.carryCapacity) {
        //         if(creep.transfer(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(links[0])
        //         }
        //     }
        // } 
        // else 
        // {
            const sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(42, 25, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
        // }
    }
};

module.exports = roleMiner3;