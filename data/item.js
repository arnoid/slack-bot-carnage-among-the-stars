var DamageProfile = require("./damageProfile.js")

var Item = class Item {
    constructor() {
        this.singleUse = false;
        this.title = "";
        this.description = "";
        this.upgradable = false
        this.profiles = {}
    }

    fromJson(json) {
        this.singleUse = json.singleUse;
        this.title = json.title;
        this.description = json.description;
        this.upgradable = json.upgradable

        if(typeof json.profiles !== 'undefined') {
            var keys = Object.keys(json.profiles);
            for(var i in keys) {
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

        for(var i in profileKeys) {
            if(profileKeys[i] === 'current') {
                continue;
            }

            var profile = this.profiles[profileKeys[i]];

            table.addRow(profileKeys[i], profile.close, profile.near, profile.far)
        }

        var upgradable = this.upgradable? "*Can be upgraded*" : "*Can NOT be upgraded*"
        var singleUse = this.singleUse? "*Single Use ONLY*" : "*Reusable*"

        return '```' + table.toString() + '\n' + upgradable + '\n' + singleUse + '\n' + this.description + '```';
    }
}

var loadAll = function loadAll() {
    try{
        var jsonfile = require('jsonfile')
        var itemsFile = require('path').dirname(require.main.filename) + '/content/items.json';
        var itemsJson = jsonfile.readFileSync(itemsFile)

        var keys = Object.keys(itemsJson);

        var items = {};

        for (var i in keys) {
            var key = keys[i];

            var itemJson = itemsJson[key]

            var item = new Item()
            item.fromJson(itemJson);

            items[key] = item;
        }

        items.toString = function() {
            var AsciiTable = require('ascii-table')

            var table = new AsciiTable('Items')

            table.setHeading('', '[*]','**Close**', '**Near**', '**Far**')

            var self = this;

            var itemParams = Object.keys(this);

            for(var i in itemParams) {
                var param = itemParams[i];

                if(typeof this[param] === 'object') {

                    var item = this[param];
                    var profile = item.profiles.basic;

                    console.log(item.title)
                    table.addRow(item.title, (item.singleUse ? '[*]':'[ ]'), profile.close, profile.near, profile.far)
                }
            }

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