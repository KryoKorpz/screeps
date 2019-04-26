var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(26, 33, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
};

module.exports = roleMiner;