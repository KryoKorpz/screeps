var pioneerDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name != 'W26N22') {
            creep.moveTo(new RoomPosition(47,25, 'W26N22'))
            
        }
        else {
            const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter:(hostile) => {
                    return(hostile.owner.username != 'Zehx')
                }
            });            if(target && creep.room.name == 'W26N22') {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                creep.moveTo(37,27)
            }
        }
    }
};

module.exports = pioneerDefender;