var linkController = {
       
    /** @param {Creep} creep **/
    run: function(link) {
        const upgradeLink = Game.getObjectById('5cc4bfce888e11392dbc9af4')
        const upgradeLinkEnergyNeeded = upgradeLink.energyCapacity - upgradeLink.energy
        if (link.cooldown == 0 && link.energy >= upgradeLinkEnergyNeeded ) {
            link.transferEnergy(upgradeLink, upgradeLinkEnergyNeeded)
        }
    }
};

module.exports = linkController;