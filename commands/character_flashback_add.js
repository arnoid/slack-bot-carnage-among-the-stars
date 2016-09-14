var Character = require('../data/character.js');

var regex = /^<@[a-zA-Z0-9]*> add (weakness|strength)$/;
var paramsRegex = /^<@([a-zA-Z0-9]*)> add ((weakness|strength))$/;

var tag = "CHARACTER FLASHBACK ADD:";

module.exports = {

    shouldSendDm: function (message) {
        return false;
    },

    process: function (message) {
        console.log(tag, message.text);

        var params = message.text.match(paramsRegex);

        var characterName = params[1];
        var flashbackType = params[2];

        var output = "no such character <@" + characterName + ">";
        try {
            var character = new Character();
            character.load(characterName)

            character.addFlashback(flashbackType);
            character.save();

            output = "<@" + characterName + "> got " + flashbackType;
        } catch (err) {
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

