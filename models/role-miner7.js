var roleMiner7 = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var source = Game.getObjectById('5bbcab7b9099fc012e6339ad');
            creep.moveTo(8, 9, {visualizePathStyle: {stroke: '#ffaa00'}});
            if(creep.pos === 8,9) {
                creep.harvest(source)
            }
        }
};


module.exports = roleMiner7;