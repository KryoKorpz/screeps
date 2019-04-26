var towerController = {
       
    /** @param {Creep} creep **/
    run: function(tower) {
        const attackTargets = tower.room.find(FIND_HOSTILE_CREEPS)
        const repairTargets = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.hits < structure.hitsMax;
            }      
        });
        const distantRepairTargets = [];
        const mediumRepairTargets = [];
        const closeRepairTargets = [];
        
        
        for (let i = 0; i < repairTargets.length; i++) {

            if (repairTargets[i].hits <= repairTargets[i].hitsMax-800 && tower.pos.getRangeTo(repairTargets[i]) <= 5) {
                closeRepairTargets.push(repairTargets[i])
            } 
            else if (repairTargets[i].hits <= repairTargets[i].hitsMax-400 && 5 < tower.pos.getRangeTo(repairTargets[i]) < 20) {
                mediumRepairTargets.push(repairTargets[i])
            } 
            else if (repairTargets[i].hits <= repairTargets[i].hitsMax-200 && tower.pos.getRangeTo(repairTargets[i]) >= 20) {

                distantRepairTargets.push(repairTargets[i])
            } 
        }
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
            else if(closeRepairTargets.length > 0) {
                tower.repair(closeRepairTargets[0])
            }
            else if(mediumRepairTargets.length > 0) {
                tower.repair(mediumRepairTargets[0])
            }
            else if(distantRepairTargets.length > 0) {
                tower.repair(distantRepairTargets[0])
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