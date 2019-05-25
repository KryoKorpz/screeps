var rolePioneerTurretUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.moveTo(39, 31, {visualizePathStyle: {stroke: '#ffaa00'}});
        if(creep.pos == 39,31) {
            const links = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return structure.structureType == STRUCTURE_LINK
            }
        })
            if(creep.carry.energy == 0) {
                if (links[1].energy > 0) {
                    if(creep.withdraw(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(links[1], {visualizePathStyle: {stroke: '#ffaa00'}});
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

module.exports = rolePioneerTurretUpgrader;