const harvestPartBuilder = (availEnergyCapacity) => {
    const workPartEnergy = availEnergyCapacity - 200;
    const workPartCount = workPartEnergy/100
    const remainingPartEnergy = availEnergyCapacity - workPartEnergy
    const partList = [];
    let partCost = 0
    for (let i = 0; i < workPartCount; i++) {
        partList.push('WORK');
        partCost += 100;
        partList.push('MOVE')
        partCost += 50
    }
    
    partList.push('CARRY')
    partCost += 50


    return {
        partList, 
        partCost
    }
}

const result1 = harvestPartBuilder(500)
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