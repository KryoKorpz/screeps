var roleTurretUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.moveTo(39, 15, {visualizePathStyle: {stroke: '#ffaa00'}});
        if(creep.pos == 39,15) {
            if(creep.carry.energy == 0) {
                const upgradeContainer = Game.getObjectById('5cc268da770d0403189fb47a')
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

module.exports = roleTurretUpgrader;