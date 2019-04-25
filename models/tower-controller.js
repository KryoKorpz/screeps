var towerController = {
   
    /** @param {Creep} creep **/
    run: function(tower) {
        const attackTargets = tower.room.find(FIND_HOSTILE_CREEPS)
        const repairTargets = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.hits <= (structure.hitsMax-200);
            }      
        });
        if(tower.energy > 0) {
            if(attackTargets.length > 0) {
                tower.attack(attackTargets[0])
            }
            else if(repairTargets.length > 0) {
                repairTargets.sort((a,b) => a.hits - b.hits);
                tower.repair(repairTargets[0])
            }
        }
	}
};

module.exports = towerController;