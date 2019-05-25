var rolePioneer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name != 'W26N23') {
            creep.moveTo(new RoomPosition(29,46, 'W26N23'))
        }
        else {
            creep.memory.role = 'pioneerWorker'
        }
    }
};

module.exports = rolePioneer;