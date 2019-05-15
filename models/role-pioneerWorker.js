var rolePioneerWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {

        const mainStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE) &&
                    structure.store[RESOURCE_ENERGY] < structure.storeCapacity
            }
        })
        // const looseEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
        const repairRamparts = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL) &&
                    structure.hits <= 100000
            }
        })
        // const repairWalls = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_WALL) &&
        //             structure.hits <= 100000
        //     }
        // })
        // if(locatedTombstones.length > 0) {
        //     for(let i = 0; i < locatedTombstones.length; i++) {
        //         if(locatedTombstones[i].store[RESOURCE_ENERGY] != 0){
        //             sourceTombs.push(locatedTombstones[i])
        //             }
        //         }
        //     };
        const repairTargets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax * .75 &&
            object.structureType != STRUCTURE_WALL &&
            object.structureType != STRUCTURE_RAMPART
        });
        // const looseEnergyToPickUp = []
	    if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity ) {
	        creep.memory.working = true;
	        creep.say('🚧 working');
	    }

        // if(looseEnergy.length > 0) {
        //     for(let i = 0; i < looseEnergy.length; i++) {
        //         if(looseEnergy[i].energy > 50){
        //             looseEnergyToPickUp.push(looseEnergy[i])
        //             }
        //         }
        // }
        // else if(sourceTombs.length > 0) {
        //     if(creep.withdraw(sourceTombs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(sourceTombs[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //     }  
        // }
            
        // const sources = creep.room.find(FIND_SOURCES, {
        //     filter: (source) => {
        //         return(source.energy != 0)
        //     }
        // });

        const extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.energy < structure.energyCapacity;
                }
        });

        const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)

        // const towers = creep.room.find(FIND_STRUCTURES, {
        //         filter: (structure) => {
        //             return structure.structureType == STRUCTURE_TOWER &&
        //             structure.energy < structure.energyCapacity-300;
        //         }
        //     })
        if(!creep.memory.working) {

            // if(looseEnergyToPickUp.length > 0) {
            //     if(creep.pickup(looseEnergyToPickUp[0]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(looseEnergyToPickUp[0], {visualizePathStyle: {stroke: '##0000FF'}})
            //     }
            // }
    	   // else if(sourceContainer.store[RESOURCE_ENERGY] > creep.carryCapacity - creep.carry.energy) {
    	   //    if(creep.withdraw(sourceContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(sourceContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
        //         }
        //     }
            if(mainStorage[0].store[RESOURCE_ENERGY] > 0) {
    	       if(creep.withdraw(mainStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mainStorage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            // else {
            //     const end = sources.length-1
            //     if(creep.harvest(sources[end]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(sources[end], {visualizePathStyle: {stroke: '#ffaa00'}});
            //     }  
            // }
        } else {

                // if(extensions.length > 0) {
                //     if(creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(extensions[0], {visualizePathStyle: {stroke: '#ffffff'}});
                //     }
                // }
                // else 
                if (repairTargets.length > 0) {
                    creep.memory.role = 'pioneerRepairer'
                }
                // else if ( towers.length > 0){
                //         creep.memory.role = 'pioneerTower'
                // }
                else if ( constructionSites.length > 0) {
                    creep.memory.role = 'pioneerBuilder'
                }
                else if (repairRamparts.length > 0){
                    creep.memory.role = 'pioneerRepairer'
                }
                else {
                    creep.memory.role = 'pioneerUpgrader'
                }
                // else if (upgradeContainer.store[RESOURCE_ENERGY] < upgradeContainer.storeCapacity) {
                //         if(creep.transfer(upgradeContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //             creep.moveTo(upgradeContainer, {visualizePathStyle: {stroke: '#ffffff'}});
                //         }
                // }
                // else {
                //     if(creep.transfer(mainStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(mainStorage, {visualizePathStyle: {stroke: '#ffffff'}});
                //     }            
                // }
        } 
    }
};

module.exports = rolePioneerWorker;
