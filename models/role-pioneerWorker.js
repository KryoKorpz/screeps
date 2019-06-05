var rolePioneerWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const roomController = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTROLLER)
            }
        })
        const mainStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE) &&
                    structure.store[RESOURCE_ENERGY] < structure.storeCapacity
            }
        })
        const looseEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
        const looseEnergyNearby = []
        const locatedTombstones = creep.room.find(FIND_TOMBSTONES);
        const sourceTombsNearby = []
        const sourceTombs = [];
        const repairRamparts = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL) &&
                    structure.hits <= 600000
            }
        })
        // const repairWalls = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_WALL) &&
        //             structure.hits <= 100000
        //     }
        // })
        if(locatedTombstones.length > 0) {
            for(let i = 0; i < locatedTombstones.length; i++) {
                if (creep.pos.getRangeTo(locatedTombstones[i]) < 10 && locatedTombstones[i].store[RESOURCE_ENERGY] != 0) {
                    sourceTombsNearby.push(locatedTombstones[i])
                }
                else if(locatedTombstones[i].store[RESOURCE_ENERGY] != 0){
                    sourceTombs.push(locatedTombstones[i])
                    }
                }
            };
        const repairTargets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax * .75 &&
            object.structureType != STRUCTURE_WALL &&
            object.structureType != STRUCTURE_RAMPART
        });
        const looseEnergyToPickUp = []
	    if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity ) {
	        creep.memory.working = true;
	        creep.say('🚧 working');
	    }

        if(looseEnergy.length > 0) {
            for(let i = 0; i < looseEnergy.length; i++) {
                if(creep.pos.getRangeTo(looseEnergy[i]) < 10) {
                    looseEnergyNearby.push(looseEnergy[i])
                    }
                else if(looseEnergy[i].energy > 150){
                    looseEnergyToPickUp.push(looseEnergy[i])
                    }
                }
        }
        
        const sourceContainers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                (structure.id !== '5cc268da770d0403189fb47a' || structure.id !== '5cd6a892e414c27d69354bf1' || structure.id !== '5ce8c173f6835b34054a9de2') &&
                structure.store[RESOURCE_ENERGY] >= 400;
            }
        })
        const sources = creep.room.find(FIND_SOURCES, {
            filter: (source) => {
                return(source.energy != 0)
            }
        });

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
            
            if(sourceTombsNearby.length > 0) {
                if(creep.withdraw(sourceTombsNearby[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTombsNearby[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }  
            }
            // else if(looseEnergyNearby.length > 0) {
            //     if(creep.pickup(looseEnergyNearby[0]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(looseEnergyNearby[0], {visualizePathStyle: {stroke: '##0000FF'}})
            //     }
            // }

    	    else if(sourceContainers.length > 0) {
    	       if(creep.withdraw(sourceContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceContainers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else if(looseEnergyToPickUp.length > 0) {
                if(creep.pickup(looseEnergyToPickUp[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(looseEnergyToPickUp[0], {visualizePathStyle: {stroke: '##0000FF'}})
                }
            }
            else if(sourceTombs.length > 0) {
                if(creep.withdraw(sourceTombs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTombs[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }  
            }
            else if(mainStorage.length > 0 && mainStorage[0].store[RESOURCE_ENERGY] > 0) {
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
                if (roomController[0].ticksToDowngrade < 10000) {
                    creep.memory.role = 'pioneerUpgrader'
                }
                else if (repairTargets.length > 0) {
                    creep.memory.role = 'pioneerRepairer'
                }
                // else if ( towers.length > 0){
                //     creep.memory.role = 'pioneerTower'
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
        } 
    }
};

module.exports = rolePioneerWorker;
