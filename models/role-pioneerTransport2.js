var rolePioneerTransport2 = {
    run: function(creep) {
        const mainStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE) &&
                (structure.id == '5cd8e3d94586281e0e62940b' || structure.id == '5ce88ef0e0ecee147c3edaec' || structure.id == '5cc2b2eec7b3a60e58b6642d')
            }
        })
        const transferLinks = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK) &&
                (structure.id == '5ceb0c29968e0233f99c097d' || structure.id == '5ccc7baaefbe39607d4499d5' || structure.id == '5cda90cfe414c27d6936853e')
            }
        })
        const locatedTombstones = creep.room.find(FIND_TOMBSTONES);
        const looseEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
        const sourceTombs = [];
        const looseEnergyToPickUp = [];

        const upgradeContainer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                (structure.store[RESOURCE_ENERGY] >= 0) &&
                (structure.id == '5cd6a892e414c27d69354bf1' || structure.id == '5ce8c173f6835b34054a9de2' || structure.id == '5cc268da770d0403189fb47a')
            }
        })
        const sourceContainer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                (structure.store[RESOURCE_ENERGY] >= creep.carryCapacity - creep.carry.energy) &&
                (structure.id !== '5cd6a892e414c27d69354bf1' && structure.id !== '5ce8c173f6835b34054a9de2' && structure.id !== '5cc268da770d0403189fb47a')
            }
        })
        const nodes = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) &&
                    structure.energy < structure.energyCapacity;
            }
        });

        const towers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER &&
                structure.energy < structure.energyCapacity-300;
            }
        });
        

        if(locatedTombstones.length > 0) {
            for(let i = 0; i < locatedTombstones.length; i++) {
                if(locatedTombstones[i].store[RESOURCE_ENERGY] > 50){
                    sourceTombs.push(locatedTombstones[i])
                    }
                }
            };
        if(looseEnergy.length > 0) {
            for(let i = 0; i < looseEnergy.length; i++) {
                if(looseEnergy[i].energy >= creep.carryCapacity - creep.carry.energy){
                    looseEnergyToPickUp.push(looseEnergy[i])
                    }
                }
            };
        if(creep.memory.transporting && creep.carry.energy == 0) {
            creep.memory.transporting = false;
            creep.say('loading');
	    };
	    if(!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.transporting = true;
	        creep.say('transporting');
        };
        
        if(!creep.memory.transporting) {
            // if(looseEnergyToPickUp.length > 0) {
            //     if(creep.pickup(looseEnergyToPickUp[0]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(looseEnergyToPickUp[0], {visualizePathStyle: {stroke: '##0000FF'}})
            //     }        
            // }
            // else 
            if(sourceTombs.length > 0) {
                if(creep.withdraw(sourceTombs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTombs[0], {maxRooms: 1, visualizePathStyle: {stroke: '#ffaa00'}});
                 }  
            } 
    	    if(transferLinks.length > 0 && transferLinks[0].energy > 0) {
                if(creep.withdraw(transferLinks[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(transferLinks[0], {maxRooms: 1, visualizePathStyle: {stroke: '#ffaa00'}});
                 }        
    	    }
    	    else if(sourceContainer.length > 0) {
    	        const end = sourceContainer.length-1
                if(creep.withdraw(sourceContainer[end], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceContainer[end], {visualizePathStyle: {stroke: '#ffaa00'}});
                 }        
    	    }
        }
        else {
            if(nodes.length > 0) {
                const end = nodes.length-1
                if(creep.transfer(nodes[end], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nodes[end], {visualizePathStyle: {stroke: '#f00aaf'}});
                }
            }
            else if ( towers.length > 0){
                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#00ffAA'}});
                }
            }
            else if(mainStorage.length > 0 ) {
                if(creep.transfer(mainStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mainStorage[0], {visualizePathStyle: {stroke: '#a00FFa'}});
                    }            
                } 
            }
        }
    }

module.exports = rolePioneerTransport2