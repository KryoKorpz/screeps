const nonAttackPartBuilder = (availEnergyCapacity) => {
    const workPartEnergy = Math.floor(availEnergyCapacity/2/100);
    const remainingPartEnergy = Math.ceil(availEnergyCapacity/4/50)
    const partList = [];
    let partCost = 0
    for (let i = 0; i < workPartEnergy; i++) {
    partList.push("WORK");
    partCost += 100;
    }
    
    for (let i = 1; i < remainingPartEnergy; i++) {
    partList.push("CARRY");
    partCost += 50;
    }
    
    for (let i = 0; i < remainingPartEnergy; i++) {
    partList.push("MOVE");
    partCost += 50;
    }
    
    return {
        partList, 
        partCost
    }
}

const parts = nonAttackPartBuilder(650)
console.log(parts.partList)