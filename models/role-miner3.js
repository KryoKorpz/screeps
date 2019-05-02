var roleMiner3 = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var sources = creep.room.find(FIND_SOURCES);
            creep.moveTo(42, 25, {visualizePathStyle: {stroke: '#ffaa00'}});
            if(creep.pos === 42,25) {
                creep.harvest(sources[0])
            }
        }
};


module.exports = roleMiner3;