var roleHarvester = require('role-harvester');
var roleUpgrader = require('role-upgrader');
var roleBuilder = require('role-builder');
var roleRepairer = require('role-repairer');
var spawnHelpers = require('spawn-helpers')

module.exports.loop = function () {
    const availEnergy = Game.rooms['W25N21'].energyAvailable
    const availEnergyCapacity = Game.rooms['W25N21'].energyCapacityAvailable
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // Creep Count Sets
    const harvesterMax = 5
    const repairerMax = 2
    const upgraderMax = 4
    const builderMax = 4
    
    // Creep count trackers
    const harvesters = spawnHelpers.creepRoleCounter('harvester', 'harvesters', harvesterMax, availEnergy, availEnergyCapacity);
    const repairers = spawnHelpers.creepRoleCounter('repairer', 'repairers', repairerMax, availEnergy, availEnergyCapacity);
    const upgraders = spawnHelpers.creepRoleCounter('upgrader', 'upgraders', upgraderMax, availEnergy, availEnergyCapacity);
    const builders = spawnHelpers.creepRoleCounter('builder', 'builders', builderMax, availEnergy, availEnergyCapacity)
        

    
    // Creep Spawners
    
    if(repairers.length < repairerMax) {
        spawnHelpers.creepRepairerSpawn('repairer', repairers, repairerMax, 'W25N21', 450, 'Spawn1')
    } 
    
    else if (harvesters.length < harvesterMax) {
        spawnHelpers.creepNonAttackSpawn('harvester', harvesters, harvesterMax, 'W25N21', 'Spawn1')
    }
    
    else if (upgraders.length < upgraderMax) {
        spawnHelpers.creepNonAttackSpawn('upgrader', upgraders, upgraderMax, 'W25N21', 'Spawn1')
    }
    
    else if (builders.length < builderMax) {
        spawnHelpers.creepNonAttackSpawn('builder', builders, builderMax, 'W25N21', 'Spawn1')
    }
    
    
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    
    // Creep run scripts

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}