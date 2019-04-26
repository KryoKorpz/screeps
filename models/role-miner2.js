var roleMiner2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var sources = creep.room.find(FIND_SOURCES);
            creep.moveTo(5, 29, {visualizePathStyle: {stroke: '#ffaa00'}});
            if(creep.pos === 5,29) {
                creep.harvest(sources[0])
            }
        }
};

module.exports = roleMiner2;