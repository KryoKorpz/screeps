var pioneerDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name != 'W26N23') {
            creep.moveTo(new RoomPosition(29,46, 'W26N23'))
            
        }
        else {
            const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter:(hostile) => {
                    return(hostile.owner.username != 'Zehx')
                }
            });            
            if(target && creep.room.name == 'W26N23') {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                creep.moveTo(27,23)
            }
        }
    }
};

module.exports = pioneerDefender;