var Item = require('../data/item.js')
var regex = /^item\s([a-zA-Z0-9 -]*)$/;

var tag = "ITEM STATS:"

module.exports = {

    shouldSendDm: function (message) {
        return false;
    },

    process: function (message) {
        console.log(tag, message.text);

        var itemName = message.text.match(regex)[1];

        var item = Item.loadAll()[itemName.toUpperCase()]

        if (typeof item === 'undefined') {
            return "<@" + message.user + ">: no such item [" + itemName + "]";
        } else {
            return "<@" + message.user + ">: \n" + item.toString();
        }

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

