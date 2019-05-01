var rolePioneerConverter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.name == 'W25N21') {
            creep.moveTo(new RoomPosition(1,31, 'W24N21'))
        } else {
            if(creep.room.controller) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
                    if(creep.signController(creep.room.controller, "I think Winter has come and gone...") == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }
            }
        }
	}
};

module.exports = rolePioneerConverter;
