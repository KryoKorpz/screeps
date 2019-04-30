var rolePioneer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.role == 'pioneer') {
            if (creep.room == 'W25N21') {
                moveTo(1,31, 'W24N21')
            } else {
                creep.memory.role = 'pioneerWorker'
            }
        }
	}
};

module.exports = rolePioneer;