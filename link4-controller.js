var link4Controller = {
       
    /** @param {Creep} creep **/
    run: function(link) {
        const transferLink = Game.getObjectById('5ceb0c29968e0233f99c097d')
        const transferLinkEnergyNeeded = transferLink.energyCapacity - transferLink.energy

        if (link.cooldown == 0 && transferLinkEnergyNeeded) {
            link.transferEnergy(transferLink, transferLinkEnergyNeeded)
        }
    }
};

module.exports = link4Controller;