var roleMiner7 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const link = Game.getObjectById('5ceb0953884d4806aa562312')
        var source = Game.getObjectById('5bbcab7b9099fc012e6339ad');

        
        creep.moveTo(8, 9)
        if (creep.carry.energy == creep.carryCapacity ) {
            if (link.energy < link.energyCapacity && creep.carry.energy == creep.carryCapacity) {
                if(creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link)
                }
            }
        } else {
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(8, 9, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
    }
};

module.exports = roleMiner7;