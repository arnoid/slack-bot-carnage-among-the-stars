var jsonfile = require('jsonfile')
var hpLabels = require('./hp_label.js').load()
var flashbackUtils = require('./flashbackUtil.js')

const MAX_HP = 3;

module.exports = {

    load : function(name) {

        var characterFile = require('path').dirname(require.main.filename) + '/' + name + '.json';

        try {
            var character = require(characterFile);
        } catch (err) {
            console.log("ERROR:", "Unable to load character [<@" + name + ">]\n" + err)
            return
        }

        character.shortStats = function() {
            var AsciiTable = require('ascii-table');

            var table = new AsciiTable();

            table.addRow('**HP**', character.hp, '**FA**', character.fa);
            table.addRow('**KILLS**', character.kills + "/" + character.missionKills, '**NFA**', character.nfa);
            table.addRow('Strength', character.calculateFlashbacks(character.strength), 'Weakness', character.calculateFlashbacks(character.weakness));
            table.addRow('**Weapons**', '**close**', '**near**', '**far**');

            for(weapon in character.weapons) {
                var currentWeapon = character.weapons[weapon];
                var weaponProfile = currentWeapon.profile.current;
                table.addRow(currentWeapon.title, weaponProfile.close, weaponProfile.near, weaponProfile.far);
            }

            return "<@" + name + ">\n ```" + table.toString() + "```";
        }

        character.fullStats = function() {
            var output = "```<@" + name + ">\n"

            var AsciiTable = require('ascii-table');

            var table = new AsciiTable();

            table.addRow('**HP**', character.hp, '**FA**', character.fa);
            table.addRow('**KILLS**', character.kills + "/" + character.missionKills, '**NFA**', character.nfa);
            table.addRow('**Weapons**', '**close**', '**near**', '**far**');

            for(weapon in character.weapons) {
                var currentWeapon = character.weapons[weapon];
                var weaponProfile = currentWeapon.profile.current;
                table.addRow(currentWeapon.title, weaponProfile.close, weaponProfile.near, weaponProfile.far);
            }

            table.addRow('**ITEMS[* - single use]**', '**close**', '**near**', '**far**');

            for(item in character.items) {
                var currentItem = character.items[item];
                var itemTitle = currentItem.title;
                if(currentItem.oneUse) {
                    itemTitle = itemTitle + "[*]"
                }
                table.addRow(itemTitle, currentItem.close, currentItem.near, currentItem.far);
            }

            table.addRow('**Strength**', '**Available**', '', '');

            for(item in character.strength) {
                var currentItem = character.strength[item];
                table.addRow(currentItem.title, currentItem.available);
            }

            table.addRow('**Weakness**', '**Available**', '', '');

            for(item in character.weakness) {
                var currentItem = character.weakness[item];
                table.addRow(currentItem.title, currentItem.available);
            }

            return "```<@" + name + ">\n" + table.toString() + "```";
        }

        character.generateHpLabel = function() {

            //hp label offset
            const offset = 1;
            var hp = '';
            for(var i = offset; i < MAX_HP + offset; i++) {
                if(this.hp < i) {
                    hp  = hp + '[ ]'
                } else {
                    hp  = hp + '[#]'
                }
            }

            return hp;
        }

        character.generateHpDescriptionLabel = function() {
        console.log("!!!!!!!", hpLabels)
            return "(" + this.hp + ") " + hpLabels[this.hp];
        }

        character.hpToString = function() {
            var AsciiTable = require('ascii-table');

            var table = new AsciiTable();

            var hpTextLabel = "(" + character.hp + ") " + hpLabels[character.hp]

            table.addRow('hp', this.generateHpLabel(), this.generateHpDescriptionLabel());

            return "```" + table.toString() + "```";
        }

        character.addItem = function(item) {
            this.items[item.title] = item;
        }

        character.removeItem = function(item) {
            delete this.items[item.title];
        }

        character.addWeapon = function(weapon) {
            this.weapons[weapon.title] = weapon;
        }

        character.removeWeapon = function(weapon) {
            delete this.weapons[weapon.title];
        }

        character.calculateFlashbacks = function(flashbacks) {
            var total = 0;
            var available = 0;
            for(key in flashbacks) {
                var flashback = flashbacks[key];
                total = total + 1;
                if(flashback.available) {
                    available = available + 1;
                }
            }

            return total + "/" + available;
        }

        character.addFlashback = function(flashbacksType) {
            this[flashbacksType].push(flashbackUtils.create());
        }

        character.useFlashback = function(flashbackType, title) {
            var used = false;
            var flashbackStorage = character[flashbackType]

            var flashback;
            for(key in flashbackStorage) {
                var tempFlashback = flashbackStorage[key];

                if(tempFlashback.available) {
                    flashback = tempFlashback;
                    break;
                }
            }

            if(typeof flashback !== 'undefined') {
                flashbackUtils.use(flashback, title);

                used = true;
            }

            return used;

        }

        character.save = function() {
            jsonfile.writeFile(
                characterFile,
                this,
                function(err, obj) {
                    console.dir(obj)
                }
            )
        }

        return character;
    },

    create : function(name) {
        var characterFile = require('path').dirname(require.main.filename) + '/' + name + '.json';

        var character = {
            name : name,
            hp: "0",
            kills: "0",
            nfa: "0",
            fa: "0",
            rank: "0",
            missionKills: "0",
            items: {
            },
            weapons: {
            },
            weakness : [],
            strength :[]
        };

        character.weakness.push(
            {
                title:"Unused",
                available: true
            }
        );

        jsonfile.writeFile(
            characterFile,
            character,
            function(err, obj) {
                console.dir(obj)
            }
        )
    }

}