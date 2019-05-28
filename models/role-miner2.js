var roleMiner2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
            const link = Game.getObjectById('5cdb3245cf35693e446421be')
            var sources = creep.room.find(FIND_SOURCES);
            creep.moveTo(26, 33, {visualizePathStyle: {stroke: '#ffaa00'}});
            if (link.energy < link.energyCapacity && creep.carry.energy == creep.carryCapacity) {
                if(creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link)
                }
            } else if(creep.pos === 26,33) {
                creep.harvest(sources[1])
            }
        }
};
module.exports = roleMiner2;