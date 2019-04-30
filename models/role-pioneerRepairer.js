var rolePioneerRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const sources = creep.room.find(FIND_SOURCES);

        const repairTargets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        repairTargets.sort((a,b) => a.hits - b.hits);
        if (creep.room.name == 'W25N21') {
            creep.moveTo(new RoomPosition(1,31, 'W24N21'))
        } else {
            if(creep.carry.energy != creep.carryCapacity){
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }  
            }    
            else if(repairTargets.length > 0) {
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            } else {
                creep.memory.role = 'pioneerUpgrader'
            }
        }
	}
};

module.exports = rolePioneerRepairer;