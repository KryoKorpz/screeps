var roleHarvester = require('role-harvester');
var roleUpgrader = require('role-upgrader');
var roleBuilder = require('role-builder');
var roleRepairer = require('role-repairer');
var roleTowerRunner = require('role-towerRunner');
var roleMiner = require('role-miner');
var roleMiner2 = require('role-miner2');
var spawnHelpers = require('spawn-helpers');
var towerController = require('tower-controller');


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
    // max levels
    const harvesterMax = 4
    const repairerMax = 0
    const upgraderMax = 3
    const builderMax = 3
    const towerRunnerMax = 1
    const minerMax = 1
    const miner2Max = 1
    
    // min levels
    const repairerMin = 0
    const upgraderMin = 2
    const builderMin = 2
    const towerRunnerMin = 1
    
    // Creep count trackers
    const harvesters = spawnHelpers.creepRoleCounter('harvester', 'harvesters', harvesterMax, availEnergy, 550);
    const miners = spawnHelpers.creepRoleCounter('miner', 'miners', minerMax, availEnergy, 600);
    const miners2 = spawnHelpers.creepRoleCounter('miner2', 'miners2', miner2Max, availEnergy, 600);
    const repairers = spawnHelpers.creepRoleCounter('repairer', 'repairers', repairerMax, availEnergy, availEnergyCapacity);
    const upgraders = spawnHelpers.creepRoleCounter('upgrader', 'upgraders', upgraderMax, availEnergy, availEnergyCapacity);
    const builders = spawnHelpers.creepRoleCounter('builder', 'builders', builderMax, availEnergy, availEnergyCapacity)
    const towerRunners = spawnHelpers.creepRoleCounter('towerRunner', 'towerRunners', towerRunnerMax, availEnergy, availEnergyCapacity)


    
    // Creep Spawners
    
    // Spawns creeps to meet min operating levels
    if(miners.length < minerMax) {
        spawnHelpers.creepMinerSpawn('miner', miners, minerMax, 'W25N21', 'Spawn1', 600)
    }
    else if(miners2.length < miner2Max) {
        spawnHelpers.creepMinerSpawn('miner2', miners2, miner2Max, 'W25N21', 'Spawn1', 600)
    }
    
    else if (harvesters.length < harvesterMax) {
        spawnHelpers.creepHarvesterSpawn('harvester', harvesters, harvesterMax, 'W25N21', 'Spawn1', 550)
    }
    
    else if(towerRunners.length < towerRunnerMin) {
        spawnHelpers.creepNonAttackSpawn('towerRunner', towerRunners, towerRunnerMin, 'W25N21', 'Spawn1')
    }
    
    else if(repairers.length < repairerMin) {
        spawnHelpers.creepNonAttackSpawn('repairer', repairers, repairerMin, 'W25N21', 'Spawn1')
    } 
    
    else if (upgraders.length < upgraderMin) {
        spawnHelpers.creepNonAttackSpawn('upgrader', upgraders, upgraderMin, 'W25N21', 'Spawn1')
    }
    
    else if (builders.length < builderMin) {
        spawnHelpers.creepNonAttackSpawn('builder', builders, builderMin, 'W25N21', 'Spawn1')
        
    } else {

        if(repairers.length < repairerMax) {
            spawnHelpers.creepNonAttackSpawn('repairer', repairers, repairerMax, 'W25N21', 'Spawn1')
        } 
        
        else if (upgraders.length < upgraderMax) {
            spawnHelpers.creepNonAttackSpawn('upgrader', upgraders, upgraderMax, 'W25N21', 'Spawn1')
        }
        
        else if (builders.length < builderMax) {
            spawnHelpers.creepNonAttackSpawn('builder', builders, builderMax, 'W25N21', 'Spawn1')
        }
    }
    
    // Spawns creeps in surplus of min operating levels
    
    
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    
    // Tower run scripts
    
    const tower1 = Game.getObjectById("5cc10edc84e06930eda124a7");
    towerController.run(tower1)
    
    // Creep run scripts
    
        
    // for (var flag in Game.flags){
    //     var flagName = Game.flags[flag]
    //     console.log(flagName.pos)
    // }

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
        if(creep.memory.role == 'towerRunner') {
            roleTowerRunner.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'miner2') {
            roleMiner2.run(creep);
        }
    }
}