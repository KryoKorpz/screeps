var roleMiner2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var sources = creep.room.find(FIND_SOURCES);
            creep.moveTo(26, 33, {visualizePathStyle: {stroke: '#ffaa00'}});
            if(creep.pos === 26,33) {
                creep.harvest(sources[1])
            }
        }
};


module.exports = roleMiner2;