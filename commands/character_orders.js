var Character = require('../data/character.js');
var Rank = require('../data/rank.js');

var regex = /^<@([a-zA-Z0-9]*)> orders$/;

var tag = "CHARACTER ORDERS:";

module.exports = {

    shouldSendDm: function (message) {
        return false;
    },

    process: function (message) {
        console.log(tag, message.text);

        var name = message.text.match(regex)[1].trim();

        var output = "<@" + message.user + ">: ";

        var character = new Character();
        try {
            character.load(name);

            console.log(Rank)

            var rank = Rank.loadAll()[character.rank];


            output = output + "\n" + rank.ordersToString();
        } catch (err) {
            output = output + " <@" + name + "> not found";
        }

        return output;
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

