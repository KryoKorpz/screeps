var link2Controller = {
       
    /** @param {Creep} creep **/
    run: function(link) {
        const upgradeLink = Game.getObjectById('5cd3b10bed840e4bab81eaa4')
        const upgradeLinkEnergyNeeded = upgradeLink.energyCapacity - upgradeLink.energy

        if (link.cooldown == 0 && upgradeLinkEnergyNeeded) {
            link.transferEnergy(upgradeLink, upgradeLinkEnergyNeeded)
        }
    }
};

module.exports = link2Controller;