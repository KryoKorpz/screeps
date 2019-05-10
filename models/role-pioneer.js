var rolePioneer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name != 'W26N22') {
            creep.moveTo(new RoomPosition(47,25, 'W26N22'))
        }
        else
        {
            creep.memory.role = 'pioneerWorker'
        }
    }
};

module.exports = rolePioneer;