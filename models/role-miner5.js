var roleMiner5 = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var source = Game.getObjectById('5bbcab7c9099fc012e6339b1');
            creep.moveTo(46, 21, {visualizePathStyle: {stroke: '#ffaa00'}});
            if(creep.pos === 46,21) {
                creep.harvest(source)
            }
        }
};


module.exports = roleMiner5;