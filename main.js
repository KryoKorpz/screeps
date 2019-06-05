var roleHarvester = require('role-harvester');
var roleTowerRunner = require('role-towerRunner');
var roleMiner = require('role-miner');
var roleMiner2 = require('role-miner2');
var roleMiner3 = require('role-miner3');
var roleMiner4 = require('role-miner4');
var roleMiner5 = require('role-miner5');
var roleMiner6 = require('role-miner6');
var roleMiner7 = require('role-miner7');
var roleTurretUpgrader = require('role-turretUpgrader');
var roleCreepKiller = require('role-creepKiller');
var roleTowerDrainer = require('role-towerDrainer');
var roleUpgradeRunner = require('role-upgradeRunner');
var roleEHarvester = require('role-eHarvester');
var roleMineralMiner = require('role-mineralMiner');
var rolePioneer = require('role-pioneer');
var rolePioneerMiner = require('role-pioneerMiner');
var rolePioneerMiner3 = require('role-pioneerMiner3');
var rolePioneerMiner4 = require('role-pioneerMiner4');
var rolePioneerWorker = require('role-pioneerWorker');
var rolePioneerBuilder = require('role-pioneerBuilder');
var rolePioneerScout = require('role-pioneerScout');
var rolePioneerTower = require('role-pioneerTower');
var rolePioneerConverter = require('role-pioneerConverter');
var rolePioneerDefender = require('role-pioneerDefender');
var rolePioneerRepairer = require('role-pioneerRepairer');
var rolePioneerUpgrader = require('role-pioneerUpgrader');
var rolePioneerTurretUpgrader = require('role-pioneerTurretUpgrader');
var rolePioneerTurretUpgrader3 = require('role-pioneerTurretUpgrader3');
var rolePioneerTurretUpgrader4 = require('role-pioneerTurretUpgrader4');
var rolePioneerTransport = require('role-pioneerTransport');
var rolePioneerTransport2 = require('role-pioneerTransport2');
var rolePioneerUpgradeRunner = require('role-pioneerUpgradeRunner');
var rolePioneerEggTender = require('role-pioneerEggTender');
var rolePhalanxCreep = require('role-phalanxCreep');
var spawnHelpers = require('spawn-helpers');
var towerController = require('tower-controller');
var tower2Controller = require('tower2-controller');
var linkController = require('link-controller');
var link12Controller = require('link1-2controller');
var link2Controller = require('link2-controller');
var link3Controller = require('link3-controller');
var link4Controller = require('link4-controller');


module.exports.loop = function () {
    const availEnergy = Game.rooms['W25N21'].energyAvailable
    const availEnergyCapacity = Game.rooms['W25N21'].energyCapacityAvailable
    const availEnergy2 = Game.rooms['W24N21'].energyAvailable
    const availEnergyCapacity2 = Game.rooms['W24N21'].energyCapacityAvailable
    const availEnergy3 = Game.rooms['W26N22'].energyAvailable
    const availEnergyCapacity3 = Game.rooms['W26N22'].energyCapacityAvailable
    const availEnergy4 = Game.rooms['W26N23'].energyAvailable
    const availEnergyCapacity4 = Game.rooms['W26N23'].energyCapacityAvailable
    
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
    const towerRunnerMax = 0
    const minerMax = 1
    const miner2Max = 1
    const miner3Max = 1
    const turretUpgraderMax = 2
    const creepKillerMax = 2
    const upgradeRunnerMax = 1
    const pioneerUpgradeRunner3Max = 2
    const pioneerTurretUpgrader3Max = 2
    const pioneerTurretUpgrader4Max = 2
    
    // min levels
    const eHarvesterMin = 1
    const mineralMinerMin = 0
    const towerRunnerMin = 0
    const creepKillerMin = 1
    const towerDrainerMin = 0
    const turretUpgraderMin = 1
    const minerMin = 1
    const miner2Min = 1
    const miner3Min = 1
    const miner4Min = 1
    const miner5Min = 1
    const miner6Min = 1
    const miner7Min = 1
    const upgradeRunnerMin = 0
    const pioneerMin = 0
    const pioneer2Min = 0
    const pioneer3Min = 0
    const pioneer4Min = 0
    const pioneerDefenderMin = 0
    const pioneerTurretUpgraderMin = 1
    const pioneerTurretUpgrader3Min = 1
    const pioneerTurretUpgrader4Min = 1
    const pioneerTransportMin = 1
    const pioneerTransport2Min = 1
    const pioneerTransport4Min = 1
    const pioneerUpgradeRunnerMin = 1
    const pioneerUpgradeRunner3Min = 1
    const pioneerEggTenderMin = 1
    const phalanxCreepMin = 5
    const pioneerConverterMin = 0
    const pioneerMinerMin = 1
    const pioneerMiner3Min = 1
    const pioneerMiner4Min = 1

    
    // Creep count trackers

    const eHarvesters = spawnHelpers.creepRoleCounter('eHarvester', 'eHarvesters', eHarvesterMin, availEnergy, 400);
    const mineralMiners = spawnHelpers.creepRoleCounter('mineralMiner', 'mineralMiners', mineralMinerMin, availEnergy, availEnergyCapacity);
    const upgradeRunners = spawnHelpers.creepRoleCounter('upgradeRunner', 'upgradeRunners', upgradeRunnerMin, availEnergy, 1150);
    const turretUpgraders = spawnHelpers.creepRoleCounter('turretUpgrader', 'turretUpgraders', turretUpgraderMax, availEnergy, 1100);
    const miners = spawnHelpers.creepRoleCounter('miner', 'miners', minerMin, availEnergy, 700);
    const miners2 = spawnHelpers.creepRoleCounter('miner2', 'miners2', miner2Min, availEnergy, 700);
    const miners3 = spawnHelpers.creepRoleCounter('miner3', 'miners3', miner3Min, availEnergy, 600);
    const miners4 = spawnHelpers.creepRoleCounter('miner4', 'miners4', miner4Min, availEnergy, 600);
    const miners5 = spawnHelpers.creepRoleCounter('miner5', 'miners5', miner5Min, availEnergy, 700);
    const miners6 = spawnHelpers.creepRoleCounter('miner6', 'miners6', miner6Min, availEnergy, 600);
    const miners7 = spawnHelpers.creepRoleCounterMiner('miner7', 'miners7', miner7Min, availEnergy, 700);
    const towerRunners = spawnHelpers.creepRoleCounter('towerRunner', 'towerRunners', towerRunnerMin, availEnergy, availEnergyCapacity)
    const creepKillers = spawnHelpers.creepRoleCounter('creepKiller', 'creepKillers', creepKillerMin, availEnergy, 950)
    const towerDrainers = spawnHelpers.creepRoleCounter('towerDrainer', 'towerDrainers', towerDrainerMin, availEnergy, 600)
    const pioneers = spawnHelpers.creepRoleCounter('pioneer', 'pioneers', pioneerMin, availEnergy, availEnergyCapacity)
    const pioneerDefenders = spawnHelpers.creepRoleCounter('pioneerDefender', 'pioneerDefenders', pioneerDefenderMin, availEnergy, availEnergyCapacity)
    const pioneerWorkers = spawnHelpers.creepRoleCounter('pioneerWorker', 'pioneerWorkers', 0, availEnergy, availEnergyCapacity)
    const pioneerBuilders = spawnHelpers.creepRoleCounter('pioneerBuilder', 'pioneerBuilders', 0, availEnergy, availEnergyCapacity)
    const pioneerTowers = spawnHelpers.creepRoleCounter('pioneerTower', 'pioneerTowers', 0, availEnergy, availEnergyCapacity)
    const pioneerRepairers = spawnHelpers.creepRoleCounter('pioneerRepairer', 'pioneerRepairers', 0, availEnergy, availEnergyCapacity)
    const pioneerUpgraders = spawnHelpers.creepRoleCounter('pioneerUpgrader', 'pioneerUpgraders', 0, availEnergy, availEnergyCapacity)
    const pioneerTurretUpgraders = spawnHelpers.creepRoleCounter('pioneerTurretUpgrader', 'pioneerTurretUpgraders', pioneerTurretUpgraderMin, availEnergy, availEnergyCapacity)
    const pioneerTurretUpgraders3 = spawnHelpers.creepRoleCounter('pioneerTurretUpgrader3', 'pioneerTurretUpgraders3', pioneerTurretUpgrader3Min, availEnergy, availEnergyCapacity)
    const pioneerTurretUpgraders4 = spawnHelpers.creepRoleCounter('pioneerTurretUpgrader4', 'pioneerTurretUpgraders4', pioneerTurretUpgrader4Min, availEnergy, availEnergyCapacity)
    const pioneerTransports = spawnHelpers.creepRoleCounter('pioneerTransport', 'pioneerTransports', pioneerTransportMin, availEnergy, 1150)
    const pioneerTransports2 = spawnHelpers.creepRoleCounter('pioneerTransport2', 'pioneerTransports2', pioneerTransport2Min, availEnergy, 1150)
    const phalanxCreeps = spawnHelpers.creepRoleCounter('phalanxCreep', 'phalanxCreeps', phalanxCreepMin, availEnergy, 650)
    const pioneerConverters = spawnHelpers.creepRoleCounter('pioneerConverter', 'pioneerConverters', pioneerConverterMin, availEnergy, 650)
    const pioneerMiners = spawnHelpers.creepRoleCounter('pioneerMiner', 'pioneerMiners', pioneerMinerMin, availEnergy, 1500)
    const pioneerMiners3 = spawnHelpers.creepRoleCounter('pioneerMiner3', 'pioneerMiners3', pioneerMiner3Min, availEnergy, 1500)
    const pioneerMiners4 = spawnHelpers.creepRoleCounter('pioneerMiner4', 'pioneerMiners4', pioneerMiner4Min, availEnergy, 1500)

    const pioneerCountTracker = pioneerWorkers.length + pioneerBuilders.length + pioneerTowers.length + pioneerRepairers.length + pioneerUpgraders.length

    // Creep Spawners\
    
    for (name in Game.spawns) {
        
        if (phalanxCreeps.length < phalanxCreepMin) {
         spawnHelpers.creepPhalanxSpawn('phalanxCreep', phalanxCreeps, phalanxCreepMin, 'W25N21', name, 50)
            
        }   
    }
    // Spawns creeps to meet min operating levels
    const sites1 = Game.rooms['W25N21'].find(FIND_CONSTRUCTION_SITES)
    const sites2 = Game.rooms['W24N21'].find(FIND_CONSTRUCTION_SITES)
    // const sites3 = Game.rooms['W26N22'].find(FIND_CONSTRUCTION_SITES)
    const sites4 = Game.rooms['W26N23'].find(FIND_CONSTRUCTION_SITES)
    
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
    const hostiles2 = Game.rooms['W24N21'].find(FIND_HOSTILE_CREEPS)
    const hostiles2InRange = []
    for(let i = 0; i < hostiles2.length; i++) {
        const towers2 = Game.rooms['W24N21'].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER;
                    }
                });
        for (let t = 0; t < towers2.length; t++) {
            const inRange = towers2[t].pos.getRangeTo(hostiles2[i])
            if(inRange < 10) {
                hostiles2InRange.push(hostiles2[i])
            }
        }
    }
    const hostiles3 = Game.rooms['W26N22'].find(FIND_HOSTILE_CREEPS)
    const hostiles3InRange = []
    for(let i = 0; i < hostiles3.length; i++) {
        const towers3 = Game.rooms['W26N22'].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER;
                    }
                });
        for (let t = 0; t < towers3.length; t++) {
            const inRange = towers3[t].pos.getRangeTo(hostiles3[i])
            if(inRange < 10) {
                hostiles3InRange.push(hostiles3[i])
            }
        }
    }
    const hostiles4 = Game.rooms['W26N23'].find(FIND_HOSTILE_CREEPS)
    const hostiles4InRange = []
    for(let i = 0; i < hostiles4.length; i++) {
        const towers4 = Game.rooms['W26N23'].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER;
                    }
                });
        for (let t = 0; t < towers4.length; t++) {
            const inRange = towers4[t].pos.getRangeTo(hostiles4[i])
            if(inRange < 10) {
                hostiles4InRange.push(hostiles4[i])
            }
        }
    }
    const room2UpgradeContainer = Game.getObjectById('5cc9fc2c5bdcc824ce25115b')
    const mineral = Game.rooms['W25N21'].find(FIND_MINERALS)
    const room1Storage = Game.getObjectById('5cc2b2eec7b3a60e58b6642d')
    // const room3Storage = Game.getObjectById('5cd8e3d94586281e0e62940b')
    const room4Storage = Game.getObjectById('5ce88ef0e0ecee147c3edaec')
    

    
    const pioneers1 = Game.rooms['W25N21'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == "pioneerWorker") || 
            (worker.memory.role == "pioneerBuilder") ||
            (worker.memory.role == "pioneerRepairer") || 
            (worker.memory.role == "pioneerUpgrader") ||
            (worker.memory.role == "pioneerTower")

        }
    })
    
    const pioneers2 = Game.rooms['W24N21'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == "pioneerWorker") || 
            (worker.memory.role == "pioneerBuilder") ||
            (worker.memory.role == "pioneerRepairer") || 
            (worker.memory.role == "pioneerUpgrader") ||
            (worker.memory.role == "pioneerTower")

        }
    })
    const pioneers3 = Game.rooms['W26N22'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == "pioneerWorker") || 
            (worker.memory.role == "pioneerBuilder") ||
            (worker.memory.role == "pioneerRepairer") || 
            (worker.memory.role == "pioneerUpgrader") ||
            (worker.memory.role == "pioneerTower")
            
        }
    })
    const pioneers4 = Game.rooms['W26N23'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == "pioneerWorker") || 
            (worker.memory.role == "pioneerBuilder") ||
            (worker.memory.role == "pioneerRepairer") || 
            (worker.memory.role == "pioneerUpgrader") ||
            (worker.memory.role == "pioneerTower")

        }
    })
    
    const pioneerEggTenders = Game.rooms['W25N21'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == "pioneerEggTender")
        }
    })
    const pioneerEggTenders2 = Game.rooms['W24N21'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == "pioneerEggTender")
        }
    })
    const pioneerEggTenders3 = Game.rooms['W26N22'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == "pioneerEggTender")
        }
    })
    const pioneerEggTenders4 = Game.rooms['W26N23'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == "pioneerEggTender")
        }
    })
    
    const pioneerTransports12 = Game.rooms['W25N21'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == 'pioneerTransport2')
        }
    })
    
    const pioneerTransports3 = Game.rooms['W26N22'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == 'pioneerTransport2')
        }
    })
    
    const pioneerTransports4 = Game.rooms['W26N23'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == 'pioneerTransport2')
        }
    })
    
    const pioneerUpgradeRunners = Game.rooms['W25N21'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == 'pioneerUpgradeRunner')
        }
    })
    
    const pioneerUpgradeRunners3 = Game.rooms['W26N22'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == 'pioneerUpgradeRunner')
        }
    })
    
    const pioneerUpgradeRunners4 = Game.rooms['W26N23'].find(FIND_MY_CREEPS, {
        filter: (worker) => {
            return (worker.memory.role == 'pioneerUpgradeRunner')
        }
    })
    const looseEnergy = Game.rooms['W25N21'].find(FIND_DROPPED_RESOURCES)
    const looseEnergy2 = Game.rooms['W24N21'].find(FIND_DROPPED_RESOURCES)
    const looseEnergy3 = Game.rooms['W26N22'].find(FIND_DROPPED_RESOURCES)
    const looseEnergy4 = Game.rooms['W26N23'].find(FIND_DROPPED_RESOURCES)
    

    // Room 4 Spawn
    
    if(pioneerEggTenders4.length < pioneerEggTenderMin && availEnergy3 < 400 ) {
        spawnHelpers.creepPioneerEggTenderSpawn('pioneerEggTender', pioneerEggTenders4, pioneerEggTenderMin, 'W26N23', 'Spawn4', 250)
    }
    else if(pioneerEggTenders4.length < pioneerEggTenderMin && looseEnergy4.length > 0) {
        spawnHelpers.creepPioneerEggTenderSpawn('pioneerEggTender', pioneerEggTenders4, pioneerEggTenderMin, 'W26N23', 'Spawn4', 250)
    }
    else if(creepKillers.length < creepKillerMin && hostiles4.length > 0 ) {
        spawnHelpers.creepKillerSpawn('creepKiller', creepKillers, creepKillerMax, 'W26N23', 'Spawn4', 950)
    }
    else if(miners6.length < miner6Min) {
        spawnHelpers.creepMinerSpawn('miner6', miners6, miner6Min, 'W26N23', 'Spawn4', 600)
    }    
    else if(miners7.length < miner7Min) {
        spawnHelpers.creepLinkMinerSpawn('miner7', miners7, miner7Min, 'W26N23', 'Spawn4', 700)
    }    
    else if (pioneerCountTracker < pioneerMin && sites3.length > 0) {
        spawnHelpers.creepPioneerSpawn('pioneerWorker', pioneers, pioneerMin, 'W26N22', 'Spawn3', 1500)
    }
    else if (pioneerTransports4.length < pioneerTransport4Min) {
        spawnHelpers.creepHarvesterSpawn('pioneerTransport2', pioneerTransports4, pioneerTransport4Min, 'W26N23', 'Spawn4', 1150)
    }
    else if (pioneers4.length < pioneer4Min) {
        spawnHelpers.creepPioneerSpawn('pioneer', pioneers, pioneer4Min, 'W26N23', 'Spawn4', 1500)
    }
    else if (pioneerMiners4.length < pioneerMiner4Min) {
        spawnHelpers.creepPioneerMinerSpawn('pioneerMiner4', pioneerMiners4, pioneerMiner4Min, 'W26N23', 'Spawn4', 1500)
    }
    else if (pioneerUpgradeRunners4.length < pioneerUpgradeRunnerMin) {
        spawnHelpers.creepHarvesterSpawn('pioneerUpgradeRunner', pioneerUpgradeRunners4, pioneerUpgradeRunnerMin, 'W26N23', 'Spawn4', 450)
    }
    else if (pioneerTurretUpgraders4.length < pioneerTurretUpgrader4Min) {
        spawnHelpers.creepPioneerTurretUpgraderSpawn('pioneerTurretUpgrader4', pioneerTurretUpgraders4, pioneerTurretUpgrader4Min, 'W26N23', 'Spawn4', 1100)
    }
    else if (pioneerTurretUpgraders4.length < pioneerTurretUpgrader4Max && room4Storage.store[RESOURCE_ENERGY] > room4Storage.storeCapacity/4) {
        spawnHelpers.creepPioneerTurretUpgraderSpawn('pioneerTurretUpgrader4', pioneerTurretUpgraders4, pioneerTurretUpgrader4Max, 'W26N23', 'Spawn4', 1100)
    }
    else if (phalanxCreeps.length < phalanxCreepMin) {
        spawnHelpers.creepPhalanxSpawn('phalanxCreep', phalanxCreeps, phalanxCreepMin, 'W26N23', 'Spawn4', 650)
    }
    else if (pioneerConverters.length < pioneerConverterMin) {
        spawnHelpers.creepPioneerConverterSpawn('pioneerConverter', pioneerConverters, pioneerConverterMin, 'W26N23', 'Spawn4', 650)
    }
    else if(pioneerDefenders.length < pioneerDefenderMin ) {
        spawnHelpers.creepKillerSpawn('pioneerDefender', pioneerDefenders, pioneerDefenderMin, 'W26N23', 'Spawn4', 650)
    }
    
    // Room 3 Spawn

    if (pioneerEggTenders3.length < pioneerEggTenderMin && availEnergy3 < 400) {
        spawnHelpers.creepPioneerEggTenderSpawn('pioneerEggTender', pioneerEggTenders3, pioneerEggTenderMin, 'W26N22', 'Spawn3', 250)
    }
    else if(pioneerEggTenders3.length < pioneerEggTenderMin && looseEnergy3.length > 0) {
        spawnHelpers.creepPioneerEggTenderSpawn('pioneerEggTender', pioneerEggTenders3, pioneerEggTenderMin, 'W26N22', 'Spawn3', 250)
    }
    else if(creepKillers.length < creepKillerMin && hostiles3.length > 0 ) {
        spawnHelpers.creepKillerSpawn('creepKiller', creepKillers, creepKillerMax, 'W26N22', 'Spawn3', 950)
    }
    else if(miners4.length < miner4Min) {
        spawnHelpers.creepMinerSpawn('miner4', miners4, miner4Min, 'W26N22', 'Spawn3', 600)
    }    
    else if(miners5.length < miner5Min) {
        spawnHelpers.creepLinkMinerSpawn('miner5', miners5, miner5Min, 'W26N22', 'Spawn3', 700)
    }    

    else if (pioneerTransports3.length < pioneerTransport2Min) {
        spawnHelpers.creepHarvesterSpawn('pioneerTransport2', pioneerTransports3, pioneerTransport2Min, 'W26N22', 'Spawn3', 1150)
    }
    if (pioneerUpgradeRunners3.length < pioneerUpgradeRunner3Min) {
        spawnHelpers.creepHarvesterSpawn('pioneerUpgradeRunner', pioneerUpgradeRunners3, pioneerUpgradeRunner3Min, 'W26N22', 'Spawn3', 850)
    }
    else if (pioneerTurretUpgraders3.length < pioneerTurretUpgrader3Min) {
        spawnHelpers.creepPioneerTurretUpgraderSpawn('pioneerTurretUpgrader3', pioneerTurretUpgraders3, pioneerTurretUpgrader3Min, 'W26N22', 'Spawn3-2', 1100)
    }
    else if (pioneerMiners3.length < pioneerMiner3Min) {
        spawnHelpers.creepPioneerMinerSpawn('pioneerMiner3', pioneerMiners3, pioneerMiner3Min, 'W26N22', 'Spawn3', 1500)
    }
    else if (pioneers3.length < pioneer3Min) {
        spawnHelpers.creepPioneerSpawn('pioneerWorker', pioneers, pioneer3Min, 'W26N22', 'Spawn3', 1500)
    }
    // else if (pioneers4.length + pioneers < pioneer3Min) {
    //     spawnHelpers.creepPioneerSpawn('pioneer', pioneers, pioneer3Min, 'W26N22', 'Spawn3', 1500)
    // }
    else if (pioneerTurretUpgraders3.length < pioneerTurretUpgrader3Max && room3Storage.store[RESOURCE_ENERGY] > room3Storage.storeCapacity/4) {
        spawnHelpers.creepPioneerTurretUpgraderSpawn('pioneerTurretUpgrader3', pioneerTurretUpgraders3, pioneerTurretUpgrader3Max, 'W26N22', 'Spawn3', 1100)
    }
    else if (pioneerUpgradeRunners3.length < pioneerUpgradeRunner3Max && room3Storage.store[RESOURCE_ENERGY] > room3Storage.storeCapacity/4) {
        spawnHelpers.creepHarvesterSpawn('pioneerUpgradeRunner', pioneerUpgradeRunners3, pioneerUpgradeRunner3Max, 'W26N22', 'Spawn3', 850)
    }
    else if (phalanxCreeps.length < phalanxCreepMin) {
        spawnHelpers.creepPhalanxSpawn('phalanxCreep', phalanxCreeps, phalanxCreepMin, 'W26N22', 'Spawn3', 650)
    }
    else if (pioneerConverters.length < pioneerConverterMin) {
        spawnHelpers.creepPioneerConverterSpawn('pioneerConverter', pioneerConverters, pioneerConverterMin, 'W26N22', 'Spawn3', 650)
    }
    else if(pioneerDefenders.length < pioneerDefenderMin ) {
        spawnHelpers.creepKillerSpawn('pioneerDefender', pioneerDefenders, pioneerDefenderMin, 'W26N22', 'Spawn3', 650)
    }
    // Room 2 Spawn
    
    if(pioneerEggTenders2.length < pioneerEggTenderMin && availEnergy2 < 400) {
        spawnHelpers.creepPioneerEggTenderSpawn('pioneerEggTender', pioneerEggTenders2, pioneerEggTenderMin, 'W24N21', 'Spawn2', 250)
    }
    else if(pioneerEggTenders2.length < pioneerEggTenderMin && looseEnergy2.length > 0) {
        spawnHelpers.creepPioneerEggTenderSpawn('pioneerEggTender', pioneerEggTenders2, pioneerEggTenderMin, 'W24N21', 'Spawn2', 250)
    }
    else if(creepKillers.length < creepKillerMin && hostiles2.length > 0 ) {
        spawnHelpers.creepKillerSpawn('creepKiller', creepKillers, creepKillerMax, 'W24N21', 'Spawn2', 950)
    }

    else if(miners3.length < miner3Min) {
        spawnHelpers.creepMinerSpawn('miner3', miners3, miner3Max, 'W24N21', 'Spawn2', 600)

    }
    else if (pioneerTransports.length < pioneerTransportMin) {
        spawnHelpers.creepHarvesterSpawn('pioneerTransport', pioneerTransports, pioneerTransportMin, 'W24N21', 'Spawn2', 1150)
    }
    else if (pioneers2.length < pioneer2Min) {
        spawnHelpers.creepPioneerSpawn('pioneerWorker', pioneers, pioneer2Min, 'W24N21', 'Spawn2', 1500)
    }
    else if (pioneerTurretUpgraders.length < pioneerTurretUpgraderMin) {
        spawnHelpers.creepPioneerTurretUpgraderSpawn('pioneerTurretUpgrader', pioneerTurretUpgraders, pioneerTurretUpgraderMin, 'W24N21', 'Spawn2', 1100)
    }
Room 1 Spawn

    if(pioneerEggTenders.length < pioneerEggTenderMin && availEnergy3 < 400) {
        spawnHelpers.creepPioneerEggTenderSpawn('pioneerEggTender', pioneerEggTenders, pioneerEggTenderMin, 'W25N21', 'Spawn1', 250)
    }
    if(pioneerEggTenders.length < pioneerEggTenderMin && looseEnergy.length > 0) {
        spawnHelpers.creepPioneerEggTenderSpawn('pioneerEggTender', pioneerEggTenders, pioneerEggTenderMin, 'W25N21', 'Spawn1', 250)
    }
    else if(creepKillers.length < creepKillerMin && hostiles.length > 0 ) {
        spawnHelpers.creepKillerSpawn('creepKiller', creepKillers, creepKillerMax, 'W25N21', 'Spawn1', 950)
    }

    else if(mineralMiners.length < mineralMinerMin && mineral[0].mineralAmount > 0) {
        spawnHelpers.creepNonAttackSpawn('mineralMiner', mineralMiners, mineralMinerMin, 'W25N21', 'Spawn1', 1150)
    }
    
    else if(miners.length < minerMin) {
        spawnHelpers.creepLinkMinerSpawn('miner', miners, minerMax, 'W25N21', 'Spawn1', 700)
    }
    else if(miners2.length < miner2Min) {
        spawnHelpers.creepLinkMinerSpawn('miner2', miners2, miner2Max, 'W25N21', 'Spawn1', 700)
    }
    
    else if (pioneerTransports12.length < pioneerTransportMin) {
        spawnHelpers.creepHarvesterSpawn('pioneerTransport2', pioneerTransports12, pioneerTransportMin, 'W25N21', 'Spawn1', 1150)
    }
    else if (pioneers1.length < pioneerMin) {
        spawnHelpers.creepPioneerSpawn('pioneerWorker', pioneers, pioneerMin, 'W25N21', 'Spawn1', 1500)
    }
    
    // else if (pioneerUpgradeRunners.length < pioneerUpgradeRunnerMin && room1Storage.store[RESOURCE_ENERGY] > room1Storage.storeCapacity/2) {
    //     spawnHelpers.creepHarvesterSpawn('pioneerUpgradeRunner', pioneerUpgradeRunners, pioneerUpgradeRunnerMin, 'W25N21', 'Spawn1', 850)
    // }
    
    else if (pioneerUpgradeRunners.length < pioneerUpgradeRunnerMin) {
        spawnHelpers.creepHarvesterSpawn('pioneerUpgradeRunner', pioneerUpgradeRunners, pioneerUpgradeRunnerMin, 'W25N21', 'Spawn1', 850)
    }
    
    else if (turretUpgraders.length < turretUpgraderMin) {
        spawnHelpers.creepTurretUpgraderSpawn('turretUpgrader', turretUpgraders, turretUpgraderMin, 'W25N21', 'Spawn1', 1100)

    }
    else if (pioneerMiners.length < pioneerMinerMin) {
        spawnHelpers.creepPioneerMinerSpawn('pioneerMiner', pioneerMiners, pioneerMinerMin, 'W25N21', 'Spawn1-2', 1500)
    }
    
    else if(towerRunners.length < towerRunnerMin) {
        spawnHelpers.creepHarvesterSpawn('towerRunner', towerRunners, towerRunnerMin, 'W25N21', 'Spawn1', 550)
    }

    else if (towerDrainers.length < towerDrainerMin ) {
        spawnHelpers.creepTowerDrainerSpawn('towerDrainer', towerDrainers, towerDrainerMin, 'W25N21', 'Spawn1', 600)
        
    } 
    else if (creepKillers.length < 2) {
        spawnHelpers.creepKillerSpawn('creepKiller', creepKillers, creepKillerMax, 'W25N21', 'Spawn1-2', 650)
    }
        
    else if (turretUpgraders.length < turretUpgraderMax && room1Storage.store[RESOURCE_ENERGY] > room1Storage.storeCapacity/4) {
        spawnHelpers.creepTurretUpgraderSpawn('turretUpgrader', turretUpgraders, turretUpgraderMax, 'W25N21', 'Spawn1-2', 1100)
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
    
    if(Game.spawns['Spawn1-2'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1-2'].spawning.name];
        Game.spawns['Spawn1-2'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1-2'].pos.x + 1,
            Game.spawns['Spawn1-2'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    if(Game.spawns['Spawn2'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn2'].spawning.name];
        Game.spawns['Spawn2'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn2'].pos.x + 1,
            Game.spawns['Spawn2'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    if(Game.spawns['Spawn3'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn3'].spawning.name];
        Game.spawns['Spawn3'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn3'].pos.x + 1,
            Game.spawns['Spawn3'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    if(Game.spawns['Spawn3-2'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn3-2'].spawning.name];
        Game.spawns['Spawn3-2'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn3-2'].pos.x + 1,
            Game.spawns['Spawn3-2'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    if(Game.spawns['Spawn4'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn4'].spawning.name];
        Game.spawns['Spawn4'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn4'].pos.x + 1,
            Game.spawns['Spawn4'].pos.y,
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
    
    const towers3 = Game.rooms['W26N22'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for (let i = 0; i < towers3.length; i++) {
        towerController.run(towers3[i]);
    }
    const towers4 = Game.rooms['W26N23'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER;
        }
    });
    for (let i = 0; i < towers4.length; i++) {
        towerController.run(towers4[i]);
    }
    


    // Link run scripts
    const uploadLink1 = Game.getObjectById('5cc4c4b1a0613307aa5b4c8c')
    linkController.run(uploadLink1)
    const transferLink1 = Game.getObjectById('5cdb3245cf35693e446421be')
    link12Controller.run(transferLink1)
    
    const transferLink4 = Game.getObjectById('5cda9f27dab07e46606a6c68')
    link3Controller.run(transferLink4)
    
    const uploadLink2 = Game.getObjectById('5cd3ac58e9c4ed77506ba620')
    link2Controller.run(uploadLink2)
    const transferLink3 = Game.getObjectById('5ceb0953884d4806aa562312')
    link4Controller.run(transferLink3)
    Creep run scripts
    
        
    for (var flag in Game.flags){
        var flagName = Game.flags[flag]
        console.log(flagName.pos)
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
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
        if(creep.memory.role == 'mineralMiner') {
            roleMineralMiner.run(creep);
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
        // if(creep.memory.role == 'pioneerTurretUpgrader') {
        //     rolePioneerTurretUpgrader.run(creep);
        // }
        if(creep.memory.role == 'pioneerTransport') {
            rolePioneerTransport.run(creep);
        }
        if(creep.memory.role == 'miner3') {
            roleMiner3.run(creep);
        }
        if(creep.memory.role == 'miner4') {
            roleMiner4.run(creep);
        }
        if(creep.memory.role == 'miner5') {
            roleMiner5.run(creep);
        }
        if(creep.memory.role == 'miner6') {
            roleMiner6.run(creep);
        }
        if(creep.memory.role == 'miner7') {
            roleMiner7.run(creep);
        }
        if(creep.memory.role == 'towerDrainer') {
            roleTowerDrainer.run(creep)
        }
        if(creep.memory.role == 'pioneerTransport2') {
            rolePioneerTransport2.run(creep);
        }
        if(creep.memory.role == 'pioneerTurretUpgrader3') {
            rolePioneerTurretUpgrader3.run(creep);
        }
        if(creep.memory.role == 'pioneerTurretUpgrader4') {
            rolePioneerTurretUpgrader4.run(creep);
        }
        if(creep.memory.role == 'pioneerUpgradeRunner') {
            rolePioneerUpgradeRunner.run(creep);
        }
        if(creep.memory.role == 'pioneerEggTender') {
            rolePioneerEggTender.run(creep);
        }
        if(creep.memory.role == 'pioneerMiner') {
            rolePioneerMiner.run(creep);
        }
        if(creep.memory.role == 'pioneerMiner3') {
            rolePioneerMiner3.run(creep);
        }
        if(creep.memory.role == 'pioneerMiner4') {
            rolePioneerMiner4.run(creep);
        }
        if(creep.memory.role == 'pioneerScout') {
            rolePioneerScout.run(creep);
        }
        if(creep.memory.role == 'phalanxCreep') {
            rolePhalanxCreep.run(creep);
        }
    }
}