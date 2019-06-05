var rolePioneerTurretUpgrader4 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.moveTo(26, 39, {visualizePathStyle: {stroke: '#ffaa00'}});
        if(creep.pos == 26,39) {
        //     const links = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //       return structure.structureType == STRUCTURE_LINK
        //     }
        // })
            if(creep.carry.energy == 0) {
                const upgradeContainer = Game.getObjectById('5ce8c173f6835b34054a9de2')
                // if (links[1].energy > 0) {
                //     if(creep.withdraw(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(links[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                //     }
                // }
                if(upgradeContainer.store[RESOURCE_ENERGY] > 0) {
                    if(creep.withdraw(upgradeContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(upgradeContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } 
            } else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }

    }
};

module.exports = rolePioneerTurretUpgrader4;