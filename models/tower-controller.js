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
        const repairRamparts = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_RAMPART) &&
                    structure.hits <= 20000
            }
        })
        const repairWalls = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_WALL) &&
                    structure.hits <= 20000
            }
        })
        if(tower.energy > 0) {
            if(attackTargets.length > 0) {
                tower.attack(attackTargets[0])
            }
            else if(repairTargets.length > 0) {
                repairTargets.sort((a,b) => a.hits - b.hits);
                tower.repair(repairTargets[0])
            }
        }
        if(tower.energy > 500) {
            if(repairRamparts.length > 0) {
                tower.repair(repairRamparts[0])
            }
            else if(repairWalls.length > 0) {
                tower.repair(repairWalls[0])
            }
        }
	}
};

module.exports = towerController;