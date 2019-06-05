var link3Controller = {
       
    /** @param {Creep} creep **/
    run: function(link) {
        const transferLink = Game.getObjectById('5cda90cfe414c27d6936853e')
        const transferLinkEnergyNeeded = transferLink.energyCapacity - transferLink.energy

        if (link.cooldown == 0 && transferLinkEnergyNeeded) {
            link.transferEnergy(transferLink, transferLinkEnergyNeeded)
        }
    }
};

module.exports = link3Controller;