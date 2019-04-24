const nonAttackPartBuilder = (availEnergyCapacity) => {
    const workPartEnergy = Math.floor(availEnergyCapacity/2/100);
    const remainingPartEnergy = Math.ceil(availEnergyCapacity/4/50)
    const partList = [];
    let partCost = 0
    for (let i = 0; i < workPartEnergy; i++) {
    partList.push(WORK);
    partCost += 100;
    }
    
    for (let i = 1; i < remainingPartEnergy; i++) {
    partList.push(CARRY);
    partCost += 50;
    }
    
    for (let i = 0; i < remainingPartEnergy; i++) {
    partList.push(MOVE);
    partCost += 50;
    }
    
    return {
        partList, 
        partCost
    }
}

const creepRoleCounter = (creepRole, creepRoles, spawnCount, availEnergy, availEnergyCapacity) => {
    creepRoles = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole);
    if (creepRoles.length < spawnCount && availEnergy === availEnergyCapacity) {
        console.log(creepRole + "s: " + creepRoles.length)
        return creepRoles
    }
    return creepRoles
}

const creepNonAttackSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc) => {
        const availEnergy = Game.rooms[gameRoom].energyAvailable;
        const availEnergyCapacity = Game.rooms[gameRoom].energyCapacityAvailable;
        const parts = nonAttackPartBuilder(availEnergyCapacity);
        const partListLength = parts.partList.length
        const partCost = parts.partCost
        
        
        if (creepRoles.length < spawnCount && availEnergy === availEnergyCapacity) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName + " Total Parts: " + partListLength + " Part Cost: " + partCost + "/" + availEnergy);
            const result = Game.spawns[spawnLoc].spawnCreep(parts.partList, newName,
                    {memory: {role: creepRole}})
                if (result != OK) {
                    console.log("error code: " + result);
                }
            }
}
    
const creepRepairerSpawn = (creepRole, creepRoles, spawnCount, gameRoom, altEnergy, spawnLoc) => {
        const availEnergy = Game.rooms[gameRoom].energyAvailable;
        const availEnergyCapacity = Game.rooms[gameRoom].energyCapacityAvailable;

        if (creepRoles.length < spawnCount && availEnergy >= altEnergy <= availEnergyCapacity) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName);
            const result =Game.spawns[spawnLoc].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
                {memory: {role: creepRole}})
                if(result != OK) {
                    console.log("error code: " + result);
                }
        }
}

const creepHarvesterSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc) => {
        const availEnergy = Game.rooms[gameRoom].energyAvailable;
        const availEnergyCapacity = Game.rooms[gameRoom].energyCapacityAvailable;

        if (creepRoles.length < spawnCount && availEnergy === availEnergyCapacity) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName );
            Game.spawns[spawnLoc].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                {memory: {role: creepRole}})
            }
}

const creepUpgraderSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc) => {
        const availEnergy = Game.rooms[gameRoom].energyAvailable;
        const availEnergyCapacity = Game.rooms[gameRoom].energyCapacityAvailable;

        if (creepRoles.length < spawnCount && availEnergy === availEnergyCapacity) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName);
            Game.spawns[spawnLoc].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                {memory: {role: creepRole}})
            }
}
   
const creepBuilderSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc) => {
        const availEnergy = Game.rooms[gameRoom].energyAvailable;
        const availEnergyCapacity = Game.rooms[gameRoom].energyCapacityAvailable;

        if (creepRoles.length < spawnCount && availEnergy === availEnergyCapacity) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName);
            Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                {memory: {role: creepRole}})
            }
}
   
module.exports = {
    creepRoleCounter,
    nonAttackPartBuilder,
    creepRepairerSpawn,
    creepHarvesterSpawn,
    creepUpgraderSpawn,
    creepBuilderSpawn,
    creepNonAttackSpawn,
    
};