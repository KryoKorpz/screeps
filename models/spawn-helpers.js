const creepRoleCounter = (creepRole, creepRoles, spawnCount) => {
    creepRoles = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole);
    if (creepRoles.length < spawnCount) {
        console.log(creepRole + "s: " + creepRoles.length)
        return creepRoles
    }
    return creepRoles
}
    
const creepRoleRepairerSpawn = (creepRole, creepRoles, spawnCount, gameRoom, altEnergy, spawnLoc) => {
        if (creepRoles.length < spawnCount && Game.rooms[gameRoom].energyAvailable <= altEnergy <= Game.rooms[gameRoom].energyCapacityAvailable) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName);
            Game.spawns[spawnLoc].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
                {memory: {role: creepRole}})
        }
}

const creepRoleHarvesterSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc) => {
            if (creepRoles.length < spawnCount && Game.rooms[gameRoom].energyAvailable === Game.rooms[gameRoom].energyCapacityAvailable) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName);
            Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                {memory: {role: creepRole}})
            }
}

const creepRoleUpgraderSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc) => {
            if (creepRoles.length < spawnCount && Game.rooms[gameRoom].energyAvailable === Game.rooms[gameRoom].energyCapacityAvailable) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName);
            Game.spawns[spawnLoc].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName,
                {memory: {role: creepRole}})
            }
}
   
const creepRoleBuilderSpawn = (creepRole, creepRoles, spawnCount, gameRoom, spawnLoc) => {
            if (creepRoles.length < spawnCount && Game.rooms[gameRoom].energyAvailable === Game.rooms[gameRoom].energyCapacityAvailable) {
            var newName = creepRole + Game.time;
            console.log('Spawning new ' + creepRole + " " + newName);
            Game.spawns[spawnLoc].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                {memory: {role: creepRole}})
            }
}
   
module.exports = {
    creepRoleCounter,
    creepRoleRepairerSpawn,
    creepRoleHarvesterSpawn,
    creepRoleUpgraderSpawn,
    creepRoleBuilderSpawn,
};