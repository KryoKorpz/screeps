var rolePioneerTransport = {
    run: function(creep) {
        const sourceContainer = Game.getObjectById('5cc973227680be3b982845d7');
        const upgradeContainer = Game.getObjectById('5cc9fc2c5bdcc824ce25115b');
        const mainStorage = Game.getObjectById('5ccb6bf2084c60608384d380');
        const locatedTombstones = creep.room.find(FIND_TOMBSTONES);
        const looseEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
        const sourceTombs = [];
        const looseEnergyToPickUp = [];
        const link = Game.getObjectById('5cd3ac58e9c4ed77506ba620')

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
                if(locatedTombstones[i].store[RESOURCE_ENERGY] != 0){
                    sourceTombs.push(locatedTombstones[i])
                    }
                }
            };
        if(looseEnergy.length > 0) {
            for(let i = 0; i < looseEnergy.length; i++) {
                if(looseEnergy[i].energy > 50){
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
            if(looseEnergyToPickUp.length > 0) {
                if(creep.pickup(looseEnergyToPickUp[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(looseEnergyToPickUp[0], {visualizePathStyle: {stroke: '##0000FF'}})
                }        
            }
            else if(sourceTombs.length > 0) {
                if(creep.withdraw(sourceTombs[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceTombs[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                 }  
            }
    	    else if(sourceContainer.store[RESOURCE_ENERGY] < sourceContainer.storeCapacity) {
                if(creep.withdraw(sourceContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
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
                else if ( towers.length > 0){
                    if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#00ffAA'}});
                    }
                }
                else if (link.energy < link.energyCapacity) {
                    if(creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(link, {visualizePathStyle: {stroke: '#00ffAA'}});
                    }
                }
                // else if (upgradeContainer.store[RESOURCE_ENERGY] < upgradeContainer.storeCapacity-400) {
                //     if(creep.transfer(upgradeContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(upgradeContainer, {visualizePathStyle: {stroke: '#AAFF'}});
                //     }
                // }
                else {
                    if(creep.transfer(mainStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(mainStorage, {visualizePathStyle: {stroke: '#a00FFa'}});
                    }            
                }
            }
    }
};

module.exports = rolePioneerTransport