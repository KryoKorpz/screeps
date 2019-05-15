// const harvestPartBuilder = (availEnergyCapacity) => {
//     const partList = [];
//     let partCost = 0
    
//     while( partCost < availEnergyCapacity - 50) {
//         partList.push('MOVE')
//         partCost += 50
//         partList.push('CARRY')
//         partCost += 50
//     }
//     partList.push('CARRY')
//     partCost += 50

//     return {
//         partList, 
//         partCost
//     }
// }

// const result1 = harvestPartBuilder(1150)
// // const result2 = harvestPartBuilder(750)
// // const result3 = harvestPartBuilder(800)
// // const result4 = harvestPartBuilder(900)

// console.log(result1.partList)
// console.log(result1.partCost)
// // console.log(result2.partList)
// // console.log(result2.partCost)
// // console.log(result3.partList)
// // console.log(result3.partCost)

// // console.log(result4.partList)
// // console.log(result4.partCost)


// Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK ], 'PioneerDefender',
//     {memory: {role: 'pioneerDefender'}})
// Game.spawns['Spawn1'].spawnCreep([CLAIM, MOVE ], 'PioneerConverter',
//     {memory: {role: 'pioneerConverter'}})
// Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, ], 'eHarvester1',
//     {memory: {role: 'eHarvester'}})

// const nonAttackPartBuilder = (availEnergyCapacity) => {
//     const workPartEnergy = Math.floor(availEnergyCapacity/2);
//     const partList = [];
//     let partCost = 0
//     for (let i = 0; i < workPartEnergy/100; i++) {
//     partList.push('WORK');
//     partCost += 100;
//     }
//     let workPartListCount = partList.length
    
//     while(workPartListCount >= 0) {
//             partList.push('MOVE');
//             partCost += 50;
//             workPartListCount -= 1;
//     }
//     while(partCost < availEnergyCapacity) {
//             partList.push('CARRY');
//             partCost += 50;
//     }
    
//     return {
//         partList, 
//         partCost
//     }
// }

const nonAttackPartBuilder = (availEnergyCapacity) => {
    let workPartEnergy = Math.floor(availEnergyCapacity/150)
    const partList = [];
    let partCost = 0
    if(availEnergyCapacity == 550) {
        for(let i = 0; i < 3; i ++) {
            partList.push('WORK')
            partCost += 100
            partList.push('MOVE')
            partCost += 50
        }
        for(let i = 0; i < 2; i ++) {
            partList.push('CARRY')
            partCost += 50
        }
        
    } else {
        if(partCost == 0 ){
            for (let i = 0; i < workPartEnergy -1; i++) {
                if (partList.length < 10) {
                    partList.push('WORK')
                    partCost += 100
                    partList.push('MOVE')
                    partCost += 50
                }
            }
        }
            while(partCost < availEnergyCapacity-100 ) {
                partList.push('MOVE')
                partCost += 50
                partList.push('CARRY')
                partCost += 50
            }
        partList.push('CARRY')
        partCost += 50
        
    }
    console.log(partList.length)

    return {
        partList, 
        partCost
    }
}

console.log(nonAttackPartBuilder(1500))