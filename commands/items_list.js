var Item = require('../data/item.js')

var regex = /^(items|item)\slist(\sweapons)?$/;

var tag = "ITEMS LIST:"

module.exports = {

    shouldSendDm: function (message) {
        return true;
    },

    process: function (message) {
        console.log(tag, message.text);

        var weaponsOnly = false;
        var param = message.text.match(regex)[2]

        if(typeof param !== 'undefined') {
            weaponsOnly = true
        }

        var allItems = Item.loadAll(weaponsOnly);

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

