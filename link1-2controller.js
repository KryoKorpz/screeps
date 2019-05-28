var link12Controller = {
       
    /** @param {Creep} creep **/
    run: function(link) {
        const transferLink = Game.getObjectById('5ccc7baaefbe39607d4499d5')
        const transferLinkEnergyNeeded = transferLink.energyCapacity - transferLink.energy

        if (link.cooldown == 0 && transferLinkEnergyNeeded) {
            link.transferEnergy(transferLink, transferLinkEnergyNeeded)
        }
    }
};

module.exports = link12Controller;