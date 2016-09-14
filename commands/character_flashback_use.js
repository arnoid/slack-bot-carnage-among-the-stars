var Character = require('../data/character.js');

var regex = /^<@([a-zA-Z0-9]*)> use (weakness|strength) ([a-zA-Z0-9 ]*)$/;

var tag = "CHARACTER FLASHBACK USE:";

module.exports = {

    shouldSendDm: function (message) {
        return false;
    },

    process: function (message) {
        console.log(tag, message.text);

        var params = message.text.match(regex);

        var characterName = params[1];
        var flashbackType = params[2];
        var flashbackTitle = params[3];

        var output = "no such character <@" + characterName + ">";
        try {
            var character = new Character()
            character.load(characterName)

            if (typeof character !== 'undefined') {
                var used = character.useFlashback(flashbackType, flashbackTitle);

                if (used) {
                    character.save();
                    output = "<@" + characterName + "> used [" + flashbackType + "] = [" + flashbackTitle + "]";
                } else {
                    output = "<@" + characterName + "> has no [" + flashbackType + "] left";
                }
            }
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

