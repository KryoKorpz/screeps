var pioneerUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.carry.energy > 0 ) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } 
        else {
                creep.memory.role = 'pioneerWorker'
            }
	}
};

module.exports = pioneerUpgrader;