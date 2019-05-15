var rolePioneerTurretUpgrader2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.moveTo(27, 42, {visualizePathStyle: {stroke: '#ffaa00'}});
        if(creep.pos == 27,42) {
        //     const links = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //       return structure.structureType == STRUCTURE_LINK
        //     }
        // })
            if(creep.carry.energy == 0) {
                const upgradeContainer = Game.getObjectById('5cd6a892e414c27d69354bf1')
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

module.exports = rolePioneerTurretUpgrader2;