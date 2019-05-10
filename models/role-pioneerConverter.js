var rolePioneerConverter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name != 'W26N22') {
            creep.moveTo(new RoomPosition(47,25, 'W26N22'))
        } else {
            if(creep.room.controller) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
                    if(creep.signController(creep.room.controller, "Yep, not very cold anymore; Cersei, life is about to get very difficult for you") == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
            }
        }
	}
};

module.exports = rolePioneerConverter;
