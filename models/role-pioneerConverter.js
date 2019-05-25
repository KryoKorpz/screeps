var rolePioneerConverter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name != 'W26N23') {
            creep.moveTo(new RoomPosition(29,46, 'W26N23'))
        } else {
            // if(creep.room.controller.owner.username) {
            //     if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(creep.room.controller);
            //     }
            // }
            // else {
                if(creep.room.controller) {
                    if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                        if(creep.signController(creep.room.controller, "Are you not entertained!?") == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                    }
                }
                
            // }
        }
	}
};

module.exports = rolePioneerConverter;
