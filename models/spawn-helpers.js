const nonAttackPartBuilder = (availEnergyCapacity) => {
    let workPartEnergy = Math.floor(availEnergyCapacity/150)
    const partList = [];
    let partCost = 0
    if(availEnergyCapacity == 550) {
        for(let i = 0; i < 3; i ++) {
            partList.push(WORK)
            partCost += 100
            partList.push(MOVE)
            partCost += 50
        }
        for(let i = 0; i < 2; i ++) {
            partList.push(CARRY)
            partCost += 50
        }
        
    } else {
        if(partCost == 0 ){
            for (let i = 0; i < workPartEnergy -1; i++) {
                if (partList.length < 10) {
                    partList.push(WORK)
                    partCost += 100
                    partList.push(MOVE)
                    partCost += 50
                }
            }
        }
            while(partCost < availEnergyCapacity-100) {
                partList.push(MOVE)
                partCost += 50
                partList.push(CARRY)
                partCost += 50
            }
        partList.push(CARRY)
        partCost += 50
        
    }

    return {
        partList, 
        partCost
    }
}

const harvestPartBuilder = (availEnergyCapacity) => {
    const partList = [];
    let partCost = 0
    
    while( partCost < availEnergyCapacity - 50) {
        partList.push(MOVE)
        partCost += 50
        partList.push(CARRY)
        partCost += 50
    }
    partList.push(CARRY)
    partCost += 50

    return {
        partList, 
        partCost
    }
}

const creepRoleCounter = (creepRole, creepRoles, spawnCount, availEnergy, availEnergyCapacity) => {
    creepRoles = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole && creep.ticksToLive > 125);
    return creepRoles
}

const creepNonAttackSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc, altEnergy) => {
        const availEnergy = Game.rooms[gameRoom].energyAvailable;
        const availEnergyCapacity = Game.rooms[gameRoom].energyCapacityAvailable;
        const parts = nonAttackPartBuilder(altEnergy);
        const partListLength = parts.partList.length
        const partCost = parts.partCost

        if (creepRoles.length < spawnCount && availEnergy === availEnergyCapacity) {
            var newName = creepRole + Game.time;
            const testSpawn = Game.spawns[spawnLoc].spawnCreep(parts.partList, newName,
                    {dryRun: true })
            if(testSpawn == OK) {
                console.log(creepRole + "s: " + creepRoles.length)
                console.log('Spawning new ' + creepRole + " " + newName + " Total Parts: " + partListLength + " Part Cost: " + partCost + "/" + availEnergy);
                const result = Game.spawns[spawnLoc].spawnCreep(parts.partList, newName,
                        {memory: {role: creepRole}})
                    if (result != OK) {
                        console.log("error code: " + result);
                    }
                }
            }
}
const creepPioneerSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc, altEnergy) => {
        const availEnergy = Game.rooms[gameRoom].energyAvailable;
        const availEnergyCapacity = Game.rooms[gameRoom].energyCapacityAvailable;
        const parts = nonAttackPartBuilder(altEnergy);
        const partListLength = parts.partList.length
        const partCost = parts.partCost

        if (creepRoles.length < spawnCount && availEnergy >= altEnergy) {
            var newName = creepRole + Game.time;
            const testSpawn = Game.spawns[spawnLoc].spawnCreep(parts.partList, newName,
                    {dryRun: true })
            if(testSpawn == OK) {
                console.log(creepRole + "s: " + creepRoles.length)
                // console.log('Spawning new ' + creepRole + " " + newName + " Total Parts: " + partListLength + " Part Cost: " + partCost + "/" + availEnergy);
                const result = Game.spawns[spawnLoc].spawnCreep(parts.partList, newName,
                        {memory: {role: creepRole}})
                    if (result != OK) {
                        console.log("error code: " + result);
                    }
                }
            }
}

const creepHarvesterSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc, altEnergy) => {
        const parts = harvestPartBuilder(altEnergy);
        
        if (creepRoles.length < spawnCount && altEnergy <= Game.rooms[gameRoom].energyAvailable) {
            var newName = creepRole + Game.time;
            var testSpawn = Game.spawns[spawnLoc].spawnCreep([CARRY, MOVE], newName,
                    { dryRun: true })
            if(testSpawn == OK) {
                console.log(creepRole + "s: " + creepRoles.length)
                console.log('Spawning new ' + creepRole + " " + newName);
                const result = Game.spawns[spawnLoc].spawnCreep(parts.partList, newName,
                        {memory: {role: creepRole}})
                    if (result != OK) {
                        console.log("error code: " + result);
                    }
                }
            }
}

const creepKillerSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc, altEnergy) => {
        
        if (creepRoles.length < spawnCount && altEnergy <= Game.rooms[gameRoom].energyAvailable) {
            var newName = creepRole + Game.time;
            const testSpawn = Game.spawns[spawnLoc].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                { dryRun: true })
            
            if(testSpawn == OK) {
                console.log(creepRole + "s: " + creepRoles.length)
                console.log('Spawning new ' + creepRole + " " + newName);
                const result = Game.spawns[spawnLoc].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, MOVE, ATTACK,], newName,
                        {memory: {role: creepRole}})
                    if (result != OK) {
                        console.log("error code: " + result);
                    }
                }
            }
}

const creepKiller3Spawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc, altEnergy) => {
        
        if (creepRoles.length < spawnCount && altEnergy <= Game.rooms[gameRoom].energyAvailable) {
            var newName = creepRole + Game.time;
            const testSpawn = Game.spawns[spawnLoc].spawnCreep([ TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE ], newName,
                { dryRun: true })
            
            if(testSpawn == OK) {
                console.log(creepRole + "s: " + creepRoles.length)
                console.log('Spawning new ' + creepRole + " " + newName);
                const result = Game.spawns[spawnLoc].spawnCreep([ TOUGH, TOUGH,  MOVE, MOVE, MOVE, ATTACK, MOVE, ATTACK ] , newName,
                        {memory: {role: creepRole}})
                    if (result != OK) {
                        console.log("error code: " + result);
                    }
                }
            }
}
const creepTowerDrainerSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc, altEnergy) => {

        if (creepRoles.length < spawnCount && altEnergy <= Game.rooms[gameRoom].energyAvailable) {
            var newName = creepRole + Game.time;
            const testSpawn = Game.spawns[spawnLoc].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                { dryRun: true })
            if(testSpawn == OK) {
                console.log(creepRole + "s: " + creepRoles.length)
                console.log('Spawning new ' + creepRole + " " + newName);
                const result = Game.spawns[spawnLoc].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
                        {memory: {role: creepRole}})
                    if (result != OK) {
                        console.log("error code: " + result);
                    }
                }
            }
}
const creepMinerSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc, altEnergy) => {
        
        if (creepRoles.length < spawnCount && altEnergy <= Game.rooms[gameRoom].energyAvailable) {
            var newName = creepRole + Game.time;
            const testSpawn = Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName,
                { dryRun: true })
            
            if(testSpawn == OK) {
                console.log(creepRole + "s: " + creepRoles.length)
                console.log('Spawning new ' + creepRole + " " + newName);
                const result = Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName,
                        {memory: {role: creepRole}})
                    if (result != OK) {
                        console.log("error code: " + result);
                    }
                }
            }
}
const creepLinkMinerSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc, altEnergy) => {
        
        if (creepRoles.length < spawnCount && altEnergy <= Game.rooms[gameRoom].energyAvailable) {
            var newName = creepRole + Game.time;
            const testSpawn = Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName,
                { dryRun: true })
            
            if(testSpawn == OK) {
                console.log(creepRole + "s: " + creepRoles.length)
                console.log('Spawning new ' + creepRole + " " + newName);
                const result = Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName,
                        {memory: {role: creepRole}})
                    if (result != OK) {
                        console.log("error code: " + result);
                    }
                }
            }
}
const creepTurretUpgraderSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc, altEnergy) => {
        
        if (creepRoles.length < spawnCount && altEnergy <= Game.rooms[gameRoom].energyAvailable) {
            var newName = creepRole + Game.time;
            const testSpawn = Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName,
                { dryRun: true })
            
            if(testSpawn == OK) {
                console.log(creepRole + "s: " + creepRoles.length)
                console.log('Spawning new ' + creepRole + " " + newName);
                const result = Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName,
                        {memory: {role: creepRole}})
                    if (result != OK) {
                        console.log("error code: " + result);
                    }
                }
            }
}
const creepPioneerTurretUpgraderSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc, altEnergy) => {
        
        if (creepRoles.length < spawnCount && altEnergy <= Game.rooms[gameRoom].energyAvailable) {
            var newName = creepRole + Game.time;
            const testSpawn = Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName,
                { dryRun: true })
            
            if(testSpawn == OK) {
                console.log(creepRole + "s: " + creepRoles.length)
                console.log('Spawning new ' + creepRole + " " + newName);
                const result = Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName,
                        {memory: {role: creepRole}})
                    if (result != OK) {
                        console.log("error code: " + result);
                    }
                }
            }
}
   
module.exports = {
    creepRoleCounter,
    nonAttackPartBuilder,
    // creepRepairerSpawn,
    creepHarvesterSpawn,
    // creepUpgraderSpawn,
    // creepBuilderSpawn,
    creepNonAttackSpawn,
    creepMinerSpawn,
    creepKillerSpawn,
    creepKiller3Spawn,
    creepTurretUpgraderSpawn,
    creepPioneerTurretUpgraderSpawn,
    creepLinkMinerSpawn,
    creepPioneerSpawn,
    creepTowerDrainerSpawn,
    
};