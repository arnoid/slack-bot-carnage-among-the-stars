var Item = require('../data/item.js')

var regex = /^(items|item)\slist$/;

var tag = "ITEMS LIST:"

module.exports = {

    shouldSendDm: function (message) {
        return true;
    },

    process: function (message) {
        console.log(tag, message.text);

        var allItems = Item.loadAll();

        console.log(allItems)

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

