var roleUpgrader = {

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

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
	        const gameFlags = Game.flags
	        constructionFlags = []
	        for(let i = 0; i < gameFlags.length; i++){
	            console.log(gameFlags[i])
	            if(gameFlags[i].name == 'construction'){
	                constructionFlags.push(gameFlags[i])
	            }
	        }
	       // console.log(constructionFlags)
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            const upgradeContainer = Game.getObjectById('5cc268da770d0403189fb47a')
            const roomContainers = creep.room.find(FIND_STRUCTURES, {
                filter:(structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                    (structure.store[RESOURCE_ENERGY] > 200 ) && structure.id != '5cc1dd1febbabb3564eef1f4'
                    roomContainers.sort((a,b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]);
                }
            })
            if(upgradeContainer.store[RESOURCE_ENERGY] > 0) {
                if(creep.withdraw(upgradeContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(upgradeContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if(roomContainers.length > 0) {
                if(creep.withdraw(roomContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roomContainers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
	}
};

module.exports = roleUpgrader;