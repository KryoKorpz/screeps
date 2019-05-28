var rolePioneerMiner3 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.transporting && creep.carry.energy == 0) {
            creep.memory.transporting = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.transporting && creep.carry.energy == creep.carryCapacity ) {
	        creep.memory.transporting = true;
	        creep.say('🚧 trans');
	    }
        const sources = creep.room.find(FIND_SOURCES, {
            filter: (source) => {
                return(source.energy != 0)
            }
        });
        const mainStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE) &&
                    structure.store[RESOURCE_ENERGY] < structure.storeCapacity
            }
        })
        if(!creep.memory.transporting) {
            if(creep.room.name !== 'W25N22') {
                creep.moveTo(new RoomPosition(18,32, 'W25N22'))
            }
            else {
                const end = sources.length-1
                if(creep.harvest(sources[end]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[end], {visualizePathStyle: {stroke: '#ffaa00'}});
                }  
            }
	    }
	    else {
            if(creep.room.name !== 'W26N22') {
                creep.moveTo(new RoomPosition(48,24, 'W26N22'))
            }
            else {
            if(creep.transfer(mainStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mainStorage[0], {visualizePathStyle: {stroke: '#a00FFa'}});
                }  
            }
	    }
    }
};


module.exports = rolePioneerMiner3;