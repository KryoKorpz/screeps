var roleHarvester = require('role-harvester');
var roleUpgrader = require('role-upgrader');
var roleBuilder = require('role-builder');
var roleRepairer = require('role-repairer');
var roleTowerRunner = require('role-towerRunner');
var roleMiner = require('role-miner');
var roleMiner2 = require('role-miner2');
var roleMiner3 = require('role-miner3');
var roleTurretUpgrader = require('role-turretUpgrader');
var roleCreepKiller = require('role-creepKiller');
var roleUpgradeRunner = require('role-upgradeRunner');
var roleEHarvester = require('role-eHarvester');
var rolePioneer = require('role-pioneer');
var rolePioneerWorker = require('role-pioneerWorker');
var rolePioneerBuilder = require('role-pioneerBuilder');
var rolePioneerTower = require('role-pioneerTower');
var rolePioneerConverter = require('role-pioneerConverter');
var rolePioneerDefender = require('role-pioneerDefender');
var rolePioneerRepairer = require('role-pioneerRepairer');
var rolePioneerUpgrader = require('role-pioneerUpgrader');
var spawnHelpers = require('spawn-helpers');
var towerController = require('tower-controller');
var linkController = require('link-controller');


module.exports.loop = function () {
    const availEnergy = Game.rooms['W25N21'].energyAvailable
    const availEnergyCapacity = Game.rooms['W25N21'].energyCapacityAvailable
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    // const constructionZone = []
    // let count = 1
    // for (let name in Game.flags) {
    //     if(name == "construction" + count) {
    //         constructionZone.push(name)
    //         count += 1
    //     }
    // }
    
    // console.log(constructionZone)
    // Creep Count Sets
    // max levels
    const harvesterMax = 3
    const repairerMax = 0
    const upgraderMax = 0
    const builderMax = 1
    const towerRunnerMax = 0
    const minerMax = 1
    const miner2Max = 1
    const miner3Max = 1
    const turretUpgraderMax = 2
    const creepKillerMax = 2
    const upgradeRunnerMax = 0
    
    // min levels
    const harvesterMin = 1
    const eHarvesterMin = 1
    const repairerMin = 0
    const upgraderMin = 0
    const builderMin = 1
    const towerRunnerMin = 0
    const creepKillerMin = 1
    const turretUpgraderMin = 1
    const minerMin = 1
    const miner2Min = 1
    const miner3Min = 1
    const upgradeRunnerMin = 1
    const pioneerMin = 3
    const pioneerBuilderMin = 0
    const pioneerWorkerMin = 0
    const pioneerTowerMin = 0
    const pioneerUpgraderMin = 0
    const pioneerRepairerMin = 0

    
    // Creep count trackers

    const harvesters = spawnHelpers.creepRoleCounter('harvester', 'harvesters', harvesterMin, availEnergy, 1150);
    const eHarvesters = spawnHelpers.creepRoleCounter('eHarvester', 'eHarvesters', eHarvesterMin, availEnergy, 400);
    const upgradeRunners = spawnHelpers.creepRoleCounter('upgradeRunner', 'upgradeRunners', upgradeRunnerMin, availEnergy, 550);
    const turretUpgraders = spawnHelpers.creepRoleCounter('turretUpgrader', 'turretUpgraders', turretUpgraderMin, availEnergy, 600);
    const miners = spawnHelpers.creepRoleCounter('miner', 'miners', minerMin, availEnergy, 700);
    const miners2 = spawnHelpers.creepRoleCounter('miner2', 'miners2', miner2Min, availEnergy, 600);
    const miners3 = spawnHelpers.creepRoleCounter('miner3', 'miners3', miner3Min, availEnergy, 600);
    const repairers = spawnHelpers.creepRoleCounter('repairer', 'repairers', repairerMin, availEnergy, availEnergyCapacity);
    const upgraders = spawnHelpers.creepRoleCounter('upgrader', 'upgraders', upgraderMin, availEnergy, availEnergyCapacity);
    const builders = spawnHelpers.creepRoleCounter('builder', 'builders', builderMin, availEnergy, availEnergyCapacity)
    const towerRunners = spawnHelpers.creepRoleCounter('towerRunner', 'towerRunners', towerRunnerMin, availEnergy, availEnergyCapacity)
    const creepKillers = spawnHelpers.creepRoleCounter('creepKiller', 'creepKillers', creepKillerMin, availEnergy, 650)
    const pioneers = spawnHelpers.creepRoleCounter('pioneer', 'pioneers', pioneerMin, availEnergy, availEnergyCapacity)
    const pioneerWorkers = spawnHelpers.creepRoleCounter('pioneerWorker', 'pioneerWorkers', pioneerWorkerMin, availEnergy, availEnergyCapacity)
    const pioneerBuilders = spawnHelpers.creepRoleCounter('pioneerBuilder', 'pioneerBuilders', pioneerBuilderMin, availEnergy, availEnergyCapacity)
    const pioneerTowers = spawnHelpers.creepRoleCounter('pioneerTower', 'pioneerTowers', pioneerTowerMin, availEnergy, availEnergyCapacity)
    const pioneerRepairers = spawnHelpers.creepRoleCounter('pioneerRepairer', 'pioneerRepairers', pioneerRepairerMin, availEnergy, availEnergyCapacity)
    const pioneerUpgraders = spawnHelpers.creepRoleCounter('pioneerUpgrader', 'pioneerUpgraders', pioneerUpgraderMin, availEnergy, availEnergyCapacity)

    const pioneerCountTracker = pioneers.length + pioneerWorkers.length + pioneerBuilders.length + pioneerTowers.length + pioneerRepairers.length + pioneerUpgraders.length
    // Creep Spawners
    
    // Spawns creeps to meet min operating levels
    const sites = Game.rooms['W25N21'].find(FIND_CONSTRUCTION_SITES)
    const hostiles = Game.rooms['W25N21'].find(FIND_HOSTILE_CREEPS)
    const hostilesInRange = []
    for(let i = 0; i < hostiles.length; i++) {
        const towers = Game.rooms['W25N21'].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER;
                    }
                });
        for (let t = 0; t < towers.length; t++) {
            const inRange = towers[t].pos.getRangeTo(hostiles[i])
            if(inRange < 10) {
                hostilesInRange.push(hostiles[i])
            }
        }
    }
    
    // Room 2 Spawn
    if(miners3.length < miner3Min) {
        spawnHelpers.creepMinerSpawn('miner3', miners3, miner3Max, 'W24N21', 'Spawn2', 600)
    }
    
    else if (pioneerCountTracker < pioneerMin ) {
        spawnHelpers.creepNonAttackSpawn('pioneer', pioneers, pioneerMin, 'W24N21', 'Spawn2')
    }
// Room 1 Spawn

    if(creepKillers.length < creepKillerMin && hostiles.length > 0 && hostilesInRange.length > 0) {
        spawnHelpers.creepKillerSpawn('creepKiller', creepKillers, creepKillerMax, 'W25N21', 'Spawn1', 650)
    }
    
    else if(eHarvesters.length < eHarvesterMin) {
        spawnHelpers.creepHarvesterSpawn('eHarvester', eHarvesters, eHarvesterMin, 'W25N21', 'Spawn1', 400)
    }
    else if(miners.length < minerMin) {
        spawnHelpers.creepLinkMinerSpawn('miner', miners, minerMax, 'W25N21', 'Spawn1', 700)
    }
    else if(miners2.length < miner2Min) {
        spawnHelpers.creepMinerSpawn('miner2', miners2, miner2Max, 'W25N21', 'Spawn1', 600)
    }
    
    else if (harvesters.length < harvesterMin) {
        spawnHelpers.creepHarvesterSpawn('harvester', harvesters, harvesterMin, 'W25N21', 'Spawn1', 1150)
    }
    
    else if (upgradeRunners.length < upgradeRunnerMin) {
        spawnHelpers.creepHarvesterSpawn('upgradeRunner', upgradeRunners, upgradeRunnerMin, 'W25N21', 'Spawn1', 550)
    }
    
    else if (turretUpgraders.length < turretUpgraderMin) {
        spawnHelpers.creepTurretUpgraderSpawn('turretUpgrader', turretUpgraders, turretUpgraderMin, 'W25N21', 'Spawn1', 1100)

    }
    
    else if(towerRunners.length < towerRunnerMin) {
        spawnHelpers.creepHarvesterSpawn('towerRunner', towerRunners, towerRunnerMin, 'W25N21', 'Spawn1', 550)
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
        spawnHelpers.creepHarvesterSpawn('harvester', harvesters, harvesterMax, 'W25N21', 'Spawn1', 1150)
        }
        
        else if (turretUpgraders.length < turretUpgraderMax) {
        spawnHelpers.creepTurretUpgraderSpawn('turretUpgrader', turretUpgraders, turretUpgraderMax, 'W25N21', 'Spawn1', 1100)
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

    const towers = Game.rooms['W25N21'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for (let i = 0; i < towers.length; i++) {
        towerController.run(towers[i]);
    }
    
    const towers2 = Game.rooms['W24N21'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for (let i = 0; i < towers2.length; i++) {
        towerController.run(towers2[i]);
    }

    // Link run scripts
    const uploadLink = Game.getObjectById('5cc4c4b1a0613307aa5b4c8c')
    linkController.run(uploadLink)
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
        if(creep.memory.role == 'eHarvester') {
            roleEHarvester.run(creep);
        }
        if(creep.memory.role == 'pioneer') {
            rolePioneer.run(creep);
        }
        if(creep.memory.role == 'pioneerWorker') {
            rolePioneerWorker.run(creep);
        }
        if(creep.memory.role == 'pioneerBuilder') {
            rolePioneerBuilder.run(creep);
        }
        if(creep.memory.role == 'pioneerTower') {
            rolePioneerTower.run(creep);
        }
        if(creep.memory.role == 'pioneerDefender') {
            rolePioneerDefender.run(creep);
        }
        if(creep.memory.role == 'pioneerConverter') {
            rolePioneerConverter.run(creep);
        }
        if(creep.memory.role == 'pioneerRepairer') {
            rolePioneerRepairer.run(creep);
        }
        if(creep.memory.role == 'pioneerUpgrader') {
            rolePioneerUpgrader.run(creep);
        }
        if(creep.memory.role == 'miner3') {
            roleMiner3.run(creep);
        }
    }
}