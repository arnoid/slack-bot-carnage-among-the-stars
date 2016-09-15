var DamageProfile = require("./damageProfile.js")

var Item = class Item {
    constructor() {
        this.singleUse = false;
        this.title = "";
        this.description = "";
        this.upgradable = false
        this.profiles = {}
        this.rank = 0;
    }

    fromJson(json) {
        this.singleUse = json.singleUse;
        this.title = json.title;
        this.description = json.description;
        this.upgradable = json.upgradable
        this.rank = json.rank

        if (typeof json.profiles !== 'undefined') {
            var keys = Object.keys(json.profiles);
            for (var i in keys) {
                var key = keys[i];

                var jsonProfile = json.profiles[key];

                var profile = new DamageProfile();
                profile.fromJson(jsonProfile);

                this.profiles[key] = profile;
            }
        }
    }

    toString() {
        var AsciiTable = require('ascii-table')

        var table = new AsciiTable(this.title)

        table.setHeading('', '*Close*', '*Near*', '*Far*', '*Single use*')

        var profileKeys = Object.keys(this.profiles);

        console.log(profileKeys)

        for (var i in profileKeys) {
            if (profileKeys[i] === 'current') {
                continue;
            }

            var profile = this.profiles[profileKeys[i]];

            table.addRow(profileKeys[i], profile.close, profile.near, profile.far)
        }

        var upgradable = this.upgradable ? "*Can be upgraded*" : "*Can NOT be upgraded*"
        var singleUse = this.singleUse ? "*Single Use ONLY*" : "*Reusable*"

        return '```' + table.toString() + '\n' + upgradable + '\n' + singleUse + '\n' + this.description + '```';
    }
}

var loadAll = function loadAll(weaponsOnly) {
    try {
        var jsonfile = require('jsonfile')
        var itemsFile = require('path').dirname(require.main.filename) + '/content/items.json';
        var itemsJson = jsonfile.readFileSync(itemsFile)

        var items = [];

        itemsJson.forEach(function (itemJson) {
            var item = new Item()
            item.fromJson(itemJson);

            items.push(item);
        })

        items.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });

        items.toString = function () {
            var AsciiTable = require('ascii-table')

            var table = new AsciiTable('Items')

            table.setHeading('', '[*]', '**Close**', '**Near**', '**Far**')
            weaponsOnly
            this.forEach(function (item) {
                // if (typeof this[param] === 'object') {

                var profile = item.profiles.basic;

                if(weaponsOnly) {
                    if(profile.close === '-' &&
                        profile.near === '-' &&
                        profile.far === '-') {
                        //ignore non-weapon
                    } else {
                        table.addRow(item.title, (item.singleUse ? '[*]' : '[ ]'), profile.close, profile.near, profile.far)
                    }
                } else {
                    table.addRow(item.title, (item.singleUse ? '[*]' : '[ ]'), profile.close, profile.near, profile.far)
                }

                // }
            })

            return table.toString()
        }

        return items;

    } catch (err) {
        console.log(err)
        throw err;
    }
}

module.exports = Item;

module.exports.loadAll = loadAll;