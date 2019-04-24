const nonAttackPartBuilder = (availEnergyCapacity) => {
    const workPartEnergy = Math.floor(availEnergyCapacity/2/100);
    const remainingPartEnergy = Math.ceil(availEnergyCapacity/4/50)
    const partList = [];
    for (let i = 0; i <= workPartEnergy; i++) {
    partList.push(WORK)
    }
    
    for (let i = 1; i < remainingPartEnergy; i++) {
    partList.push(CARRY)
    }
    
    for (let i = 0; i < remainingPartEnergy; i++) {
    partList.push(MOVE)
    }
    
    return partList
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
        const partList = nonAttackPartBuilder(availEnergyCapacity);
        const partListLength = partList.length
        
        if (creepRoles.length < spawnCount && availEnergy === availEnergyCapacity) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName + " Total Parts: " + partListLength);
            const result = Game.spawns[spawnLoc].spawnCreep(partList, newName,
                    {memory: {role: creepRole}})
                if (result != OK) {
                    console.log("error code: " + result)
                }
            }
}
    
const creepRepairerSpawn = (creepRole, creepRoles, spawnCount, gameRoom, altEnergy, spawnLoc) => {
        const availEnergy = Game.rooms[gameRoom].energyAvailable;
        const availEnergyCapacity = Game.rooms[gameRoom].energyCapacityAvailable;

        if (creepRoles.length < spawnCount && availEnergy <= altEnergy <= availEnergyCapacity) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName);
            Game.spawns[spawnLoc].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
                {memory: {role: creepRole}})
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