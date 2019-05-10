var roleMiner4 = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var source = Game.getObjectById('5bbcab7c9099fc012e6339b2');
            creep.moveTo(37, 38, {visualizePathStyle: {stroke: '#ffaa00'}});
            if(creep.pos === 37,38) {
                creep.harvest(source)
            }
        }
};


module.exports = roleMiner4;