var rolePioneerWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const sourceContainer = Game.getObjectById('5cc973227680be3b982845d7')
        const upgradeContainer = Game.getObjectById('5cc973227680be3b982845d7')
        const locatedTombstones = creep.room.find(FIND_TOMBSTONES);
        const looseEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
        const sourceTombs = []
        const looseEnergyToPickUp = []
	    if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	        creep.say('🚧 working');
	    }
        if(locatedTombstones.length > 0) {
            for(let i = 0; i < locatedTombstones.length; i++) {
                if(locatedTombstones[i].store[RESOURCE_ENERGY] != 0){
                    sourceTombs.push(locatedTombstones[i])
                    }
                }
            }
        if(looseEnergy.length > 0) {
            for(let i = 0; i < looseEnergy.length; i++) {
                if(looseEnergy[i].energy > 50){
                    looseEnergyToPickUp.push(looseEnergy[i])
                    }
                }
            }
            
        const sources = creep.room.find(FIND_SOURCES);

        const extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.energy < structure.energyCapacity;
                }
        });

        const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)

        const towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER &&
                    structure.energy < structure.energyCapacity-300;
                }
            })
        if(!creep.memory.working) {
            if(sourceTombs.length > 0) {
                if(creep.withdraw(sourceTombs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTombs[0], {visualizePathStyle: {stroke: '##0000FF'}})
                }
            }
            else if(looseEnergyToPickUp.length > 0) {
                if(creep.pickup(looseEnergyToPickUp[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(looseEnergyToPickUp[0], {visualizePathStyle: {stroke: '##0000FF'}})
                }
            }
    	    else if(sourceContainer.store[RESOURCE_ENERGY] > 200) {
    	       if(creep.withdraw(sourceContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }  
            }
        } else {
                if(extensions.length > 0) {
                        if(creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(extensions[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                } 
                else if ( constructionSites.length > 0) {
                        creep.memory.role = 'pioneerBuilder'
                }
                else if ( towers.length > 0){
                        creep.memory.role = 'pioneerTower'
                } else {
                    creep.memory.role = 'pioneerRepairer'
            }
        } 
    }
};

module.exports = rolePioneerWorker;
