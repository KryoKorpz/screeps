var roleMineralMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var hydrogen = Game.getObjectById('5bbcb1fa40062e4259e93566');
            const mainStorage = Game.getObjectById('5cc2b2eec7b3a60e58b6642d')
            const hydroLab = Game.getObjectById('5ccc8837c0d7300bba218ff4')
            const total = _.sum(creep.carry)

            if(creep.memory.mining && total == 0) {
                creep.memory.mining = false;
                creep.say('mining');
    	    }
    	    
    	    if(!creep.memory.mining && total == creep.carryCapacity) {
    	        creep.memory.mining = true;
    	        creep.say('depositing');
    	    }
    	    
            
            if (!creep.memory.mining) {
                if(creep.harvest(hydrogen) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(hydrogen, {visualizePathStyle: {stroke: '#ffaa00'}});
                }  
            }
                else {
                    if(hydroLab.mineralAmount < hydroLab.mineralCapacity) {
                        if(creep.transfer(hydroLab, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(hydroLab, {visualizePathStyle: {stroke: '#ffffff'}})
                        }
                    }
                    else {
                        if(creep.transfer(mainStorage.store[RESOURCE_HYDROGEN] && mainStorage.store[RESOURCE_ENERGY] < mainStorage.storeCapacity)) {
                            if(creep.transfer(mainStorage, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(mainStorage, {visualizePathStyle: {stroke: '#ffffff'}})
                            }
                        }
                    }
                }
            }
        };


module.exports = roleMineralMiner;