var roleMiner6 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const miner6 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner6');
            var source = Game.getObjectById('5bbcab7b9099fc012e6339ae');
            creep.moveTo(24, 31, {visualizePathStyle: {stroke: '#ffaa00'}});
            if(creep.pos === 24,31 && miner6.length < 2) {
                creep.harvest(source)
            }
        }
};


module.exports = roleMiner6;