var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        const locatedTombstones = creep.room.find(FIND_TOMBSTONES);
        if(locatedTombstones.length) {
            for(let i = 0; i < locatedTombstones.length; i++) {
                if(locatedTombstones[i].store[RESOURCE_ENERGY] > 0){
                    const range = creep.pos.getRangeTo(locatedTombstones[i]);
                    if(range <= 5) {
                        if(creep.withdraw(locatedTombstones[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(locatedTombstones[i], {visualizePathStyle: {stroke: '##0000FF'}})
                        }
                    }
                }
            }
        }
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.memory.role = 'upgrader'
            }
	    }
	    else {
	        const mainStorage = creep.room.find(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return structure.structureType == STRUCTURE_STORAGE &&
	                structure.store[RESOURCE_ENERGY] > 6000;
	            }
	        })
	        if(mainStorage.length > 0) {
	               if(creep.withdraw(mainStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(mainStorage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
	        } else {
                const container1 = creep.room.find(FIND_STRUCTURES, {
                    filter:(structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                        (structure.id == '5cc185d42bc4d56965660444') 
                        }
                })
                const container2 = creep.room.find(FIND_STRUCTURES, {
                    filter:(structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                        (structure.id == '5cc1495d9ae56330f9f33526')
                        }
                })
                
                const avg1 = container1[0].store[RESOURCE_ENERGY] / container1[0].storeCapacity
                const avg2 = container2[0].store[RESOURCE_ENERGY] / container2[0].storeCapacity
                
                if(avg1 > avg2) {
                    if(creep.withdraw(container1[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container1[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    {
                        if(creep.withdraw(container2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container2[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                }
	        }
        }
	}
};

module.exports = roleBuilder;