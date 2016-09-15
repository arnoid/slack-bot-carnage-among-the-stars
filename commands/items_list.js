var Item = require('../data/item.js')
var Character = require('../data/character.js')

var weapons = "weapons"
var ranked = "ranked"
var regex = /^(items|item)\slist(\sweapons)?(\sranked)?$/;

var tag = "ITEMS LIST:"

module.exports = {

    shouldSendDm: function (message) {
        return true;
    },

    process: function (message) {
        console.log(tag, message.text);

        var weaponsOnly = typeof message.text.match(regex).find(function (item) {
                if (typeof item === 'undefined') {
                    return false;
                }
                return item.trim() === weapons;
            }) !== 'undefined';

        var rankedOnly = typeof message.text.match(regex).find(function (item) {
                if (typeof item === 'undefined') {
                    return false;
                }
                return item.trim() === ranked;
            }) !== 'undefined';

        var allItems = Item.loadAll(weaponsOnly);

        if (rankedOnly) {
            var character = new Character().load(message.user);
            var toString = allItems["toString"];
            allItems = allItems.filter(function (item) {
                return item.rank <= character.rank;
            })

            allItems["toString"] = toString;
        }

        return "<@" + message.user + ">: \n" + "```" + allItems.toString() + "```";
    },

    identify: function (commandText) {
        var result;
        if (commandText.match(regex)) {
            console.log(tag, "matches message [" + commandText + "]");
            result = true;
        } else {
            console.log(tag, "NOT matches message [" + commandText + "]");
            result = false;
        }

        return result;
    }

}

