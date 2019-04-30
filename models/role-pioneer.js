var rolePioneer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.role == 'pioneer') {
            if (creep.room.name == 'W25N21') {
                creep.moveTo(new RoomPosition(1,31, 'W24N21'))
            } else {
                creep.memory.role = 'pioneerWorker'
            }
        }
	}
};

module.exports = rolePioneer;