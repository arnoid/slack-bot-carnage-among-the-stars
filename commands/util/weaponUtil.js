var jsonfile = require('jsonfile')
var weaponsFile = require('path').dirname(require.main.filename) + '/weapons.json';

module.exports = {

    loadAll : function() {
        var weapons = require(weaponsFile);

        weapons.toString = function() {
            var AsciiTable = require('ascii-table');

            var table = new AsciiTable('Weapons');
            table .setHeading('name', 'profile', 'close', 'near', 'far');

            var weaponNames = Object.keys(weapons)

            for(key in weaponNames) {
                key = Object.keys(weapons)[key];

                if( typeof weapons[key] !== 'object') {
                    continue;
                }

                var weapon = weapons[key];

                var basic = weapon.profile.basic;
                var best = weapon.profile.best;

                console.log(weapon.title);

                table.addRow(weapon.title, 'basic', basic.close, basic.near, basic.far);
                table.addRow('', 'best', best.close, best.near, best.far);
            }

            return "```" + table.toString() + "```";
        }

        return weapons;
    },

    load : function(weapon) {

        var weapon = this.loadAll()[weapon.toUpperCase()];

        if(typeof weapon == 'undefined') {
            return;
        }

        weapon.toString = function() {
            var AsciiTable = require('ascii-table');

            var table = new AsciiTable(weapon.title);

            var basic = weapon.profile.basic;
            var best = weapon.profile.best;

            table.addRow('', '**close**', '**near**', '**far**');
            table.addRow('basic', basic.close, basic.near, basic.far);
            table.addRow('best', best.close, best.near, best.far);

            table.add

            return "```" + table.toString() + '\n' + weapon.description + "```";
        }

        return weapon;
    },

}