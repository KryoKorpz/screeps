const nonAttackPartBuilder = (availEnergyCapacity) => {
    const workPartEnergy = Math.floor(availEnergyCapacity/2);
    console.log(workPartEnergy)
    const partList = [];
    let partCost = 0
    for (let i = 0; i < workPartEnergy/100; i++) {
    partList.push('WORK');
    partCost += 100;
    }
    let workPartListCount = partList.length
    
    while(workPartListCount >= 0) {
            partList.push('MOVE');
            partCost += 50;
            workPartListCount -= 1;
    }
    while(partCost < availEnergyCapacity) {
            partList.push('CARRY');
            partCost += 50;
    }
    
    return {
        partList, 
        partCost
    }
}

const result1 = nonAttackPartBuilder(700)
const result2 = nonAttackPartBuilder(750)
const result3 = nonAttackPartBuilder(800)
const result4 = nonAttackPartBuilder(900)

console.log(result1.partList)
console.log(result1.partCost)
console.log(result2.partList)
console.log(result2.partCost)
console.log(result3.partList)
console.log(result3.partCost)
console.log(result4.partList)
console.log(result4.partCost)