const harvestPartBuilder = (availEnergyCapacity) => {
    const partList = [];
    let partCost = 0
    
    while( partCost < availEnergyCapacity - 50) {
        partList.push('MOVE')
        partCost += 50
        partList.push('CARRY')
        partCost += 50
    }
    partList.push('CARRY')
    partCost += 50

    return {
        partList, 
        partCost
    }
}

const result1 = harvestPartBuilder(1150)
// const result2 = harvestPartBuilder(750)
// const result3 = harvestPartBuilder(800)
// const result4 = harvestPartBuilder(900)

console.log(result1.partList)
console.log(result1.partCost)
// console.log(result2.partList)
// console.log(result2.partCost)
// console.log(result3.partList)
// console.log(result3.partCost)

// console.log(result4.partList)
// console.log(result4.partCost)


Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK ], 'PioneerDefender',
    {memory: {role: 'pioneerDefender'}})
Game.spawns['Spawn1'].spawnCreep([CLAIM, MOVE ], 'PioneerConverter',
    {memory: {role: 'pioneerConverter'}})