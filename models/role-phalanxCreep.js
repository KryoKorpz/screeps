var rolePhalanxCreep = {

    run: function(creep) {
        if(creep.room.name != 'W26N21') {
            creep.moveTo(new RoomPosition(27,22, 'W26N21'))
        }
        // else {
        //     const hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        //         filter:(hostile) => {
        //             return(hostile.owner.username != 'Zehx')
        //         }
        //     });
        //     const hostileStructuresRamparts = creep.room.find(FIND_HOSTILE_STRUCTURES, {
        //         filter:(hostile) => {
        //             return(hostile.owner.username != 'Zehx') &&
        //             hostile.structureType != STRUCTURE_CONTROLLER &&
        //             hostile.structureType == STRUCTURE_RAMPART
        //         }
        //     });
        //     const hostileStructuresOthers = creep.room.find(FIND_HOSTILE_STRUCTURES, {
        //         filter:(hostile) => {
        //             return(hostile.owner.username != 'Zehx') &&
        //             hostile.structureType != STRUCTURE_CONTROLLER &&
        //             hostile.structureType != STRUCTURE_RAMPART
        //         }
        //     });

        //     if(hostileCreeps != null ) {
        //         if(creep.attack(hostileCreeps[0]) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(hostileCreeps[0])
        //         }
        //     }
        //     else if(hostileStructuresRamparts.length > 0) {
        //         if(creep.attack(hostileStructuresRamparts[0]) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(hostileStructuresRamparts[0])
        //         }
        //     }
        //     else if (hostileStructuresOthers.length > 0) {
        //         if(creep.attack(hostileStructuresOthers[0]) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(hostileStructuresOthers[0])
        //         }
        //     }
        // }
    }
};

module.exports = rolePhalanxCreep;
