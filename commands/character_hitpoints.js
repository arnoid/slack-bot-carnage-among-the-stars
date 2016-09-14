var regex = /^<@([a-zA-Z0-9]*)>\shp$/;

var Character = require('../data/character.js')

var tag = "HITPOINTS:"

module.exports = {

    shouldSendDm: function (message) {
        return false;
    },

    process: function (message) {
        console.log(tag, message);

        var name = message.text.match(regex)[1];

        var output = 'no such character';
        try {
            var character = new Character;
            character.load(name);

            if (typeof character !== 'undefined') {
                output = character.hpToString();
            }
        } catch (err) {
        }

        return "<@" + name + "> " + output;
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

