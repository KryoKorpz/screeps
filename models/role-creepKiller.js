var roleCreepKiller = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter:(hostile) => {
                return(hostile.owner.username != 'Zehx')
            }
        });
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.moveTo(17,45)
        }
    }
};

module.exports = roleCreepKiller;
