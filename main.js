var roleHarvester = require('role-harvester');
var roleUpgrader = require('role-upgrader');
var roleBuilder = require('role-builder');
var roleRepairer = require('role-repairer');
var roleTowerRunner = require('role-towerRunner');
var roleMiner = require('role-miner');
var roleMiner2 = require('role-miner2');
var roleTurretUpgrader = require('role-turretUpgrader');
var roleCreepKiller = require('role-creepKiller');
var roleUpgradeRunner = require('role-upgradeRunner');
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
    const upgraderMax = 2
    const builderMax = 2
    const towerRunnerMax = 2
    const minerMax = 1
    const miner2Max = 1
    const turretUpgraderMax = 0
    const creepKillerMax = 2
    const upgradeRunnerMax = 2
    
    // min levels
    const harvesterMin = 2
    const repairerMin = 0
    const upgraderMin = 1
    const builderMin = 1
    const towerRunnerMin = 1
    const creepKillerMin = 1
    const turretUpgraderMin = 1
    const minerMin = 1
    const miner2Min = 1
    const upgradeRunnerMin = 1
    
    // Creep count trackers

    const harvesters = spawnHelpers.creepRoleCounter('harvester', 'harvesters', harvesterMin, availEnergy, 550);
    const upgradeRunners = spawnHelpers.creepRoleCounter('upgradeRunner', 'upgradeRunners', upgradeRunnerMin, availEnergy, 550);
    const turretUpgraders = spawnHelpers.creepRoleCounter('turretUpgrader', 'turretUpgraders', turretUpgraderMin, availEnergy, 600);
    const miners = spawnHelpers.creepRoleCounter('miner', 'miners', minerMin, availEnergy, 600);
    const miners2 = spawnHelpers.creepRoleCounter('miner2', 'miners2', miner2Min, availEnergy, 600);
    const repairers = spawnHelpers.creepRoleCounter('repairer', 'repairers', repairerMin, availEnergy, availEnergyCapacity);
    const upgraders = spawnHelpers.creepRoleCounter('upgrader', 'upgraders', upgraderMin, availEnergy, availEnergyCapacity);
    const builders = spawnHelpers.creepRoleCounter('builder', 'builders', builderMin, availEnergy, availEnergyCapacity)
    const towerRunners = spawnHelpers.creepRoleCounter('towerRunner', 'towerRunners', towerRunnerMin, availEnergy, availEnergyCapacity)
    const creepKillers = spawnHelpers.creepRoleCounter('creepKiller', 'creepKillers', creepKillerMin, availEnergy, 650)


    
    // Creep Spawners
    
    // Spawns creeps to meet min operating levels
    const sites = Game.rooms['W25N21'].find(FIND_CONSTRUCTION_SITES)
    const hostiles = Game.rooms['W25N21'].find(FIND_HOSTILE_CREEPS)
    const hostilesInRange = []
    for(let i = 0; i < hostiles.length; i++) {
        const tower = Game.rooms['W25N21'].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER;
                    }
            });
        const inRange = tower[0].pos.getRangeTo(hostiles[i])
        if(inRange < 10) {
            hostilesInRange.push(hostiles[i])
        }
    }

    if(creepKillers.length < creepKillerMin && hostiles.length > 0 && hostilesInRange.length > 0) {
        spawnHelpers.creepKillerSpawn('creepKiller', creepKillers, creepKillerMax, 'W25N21', 'Spawn1', 650)
    }
    else if(miners.length < minerMin) {
        spawnHelpers.creepMinerSpawn('miner', miners, minerMax, 'W25N21', 'Spawn1', 600)
    }
    else if(miners2.length < miner2Min) {
        spawnHelpers.creepMinerSpawn('miner2', miners2, miner2Max, 'W25N21', 'Spawn1', 600)
    }
    
    else if (harvesters.length < harvesterMin) {
        spawnHelpers.creepHarvesterSpawn('harvester', harvesters, harvesterMax, 'W25N21', 'Spawn1', 550)
    }
    
    else if (upgradeRunners.length < upgradeRunnerMin) {
        spawnHelpers.creepHarvesterSpawn('upgradeRunner', upgradeRunners, harvesterMax, 'W25N21', 'Spawn1', 550)
    }
    
    else if (turretUpgraders.length < turretUpgraderMin) {
        spawnHelpers.creepMinerSpawn('turretUpgrader', turretUpgraders, turretUpgraderMin, 'W25N21', 'Spawn1', 600)

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
    
    else if (builders.length < builderMin && sites.length > 0) {
        spawnHelpers.creepNonAttackSpawn('builder', builders, builderMin, 'W25N21', 'Spawn1')
        
    } else {
        
        if (creepKillers.length < creepKillerMax && hostiles.length > 0 && hostilesInRange.length > 0) {
        spawnHelpers.creepKillerSpawn('creepKiller', creepKillers, creepKillerMax, 'W25N21', 'Spawn1', 650)
        }
        
        else if (harvesters.length < harvesterMax) {
        spawnHelpers.creepHarvesterSpawn('harvester', harvesters, harvesterMax, 'W25N21', 'Spawn1', 550)
        }
        
        else if (upgradeRunners.length < upgradeRunnerMax) {
        spawnHelpers.creepHarvesterSpawn('upgradeRunner', upgradeRunners, upgradeRunnerMax, 'W25N21', 'Spawn1', 550)
        }

        else if(repairers.length < repairerMax) {
            spawnHelpers.creepNonAttackSpawn('repairer', repairers, repairerMax, 'W25N21', 'Spawn1')
        } 
        
        else if (upgraders.length < upgraderMax) {
            spawnHelpers.creepNonAttackSpawn('upgrader', upgraders, upgraderMax, 'W25N21', 'Spawn1')
        }
        
        else if (builders.length < builderMax && sites.length > 0) {
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
        if(creep.memory.role == 'turretUpgrader') {
            roleTurretUpgrader.run(creep);
        }
        if(creep.memory.role == 'creepKiller') {
            roleCreepKiller.run(creep);
        }
        if(creep.memory.role == 'upgradeRunner') {
            roleUpgradeRunner.run(creep);
        }
    }
}