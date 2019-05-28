var roleMiner5 = {

    /** @param {Creep} creep **/
    run: function(creep) {
            const link = Game.getObjectById('5cda9f27dab07e46606a6c68')
            var source = Game.getObjectById('5bbcab7c9099fc012e6339b1');
            creep.moveTo(46, 21, {visualizePathStyle: {stroke: '#ffaa00'}});
            if (link.energy < link.energyCapacity && creep.carry.energy == creep.carryCapacity) {
                if(creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link)
                }
            }
            if(creep.pos === 46,21) {
                creep.harvest(source)
            }
        }
};




module.exports = roleMiner5;