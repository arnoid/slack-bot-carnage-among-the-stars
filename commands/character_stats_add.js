var Character = require('../data/character.js');

var regex = /^<@[a-zA-Z0-9]*> (fa|nfa|kills|hp|missionKills|rank) [-+0-9]*$/;
var characterNameRegex = /^<@([a-zA-Z0-9]*)> (fa|nfa|kills|hp|missionKills|rank) [-+0-9]*$/;
var statRegex = /^<@[a-zA-Z0-9]*> (fa|nfa|kills|hp|missionKills|rank) ([-+0-9]*)$/;

var tag = "CHARACTER ADD KILLS:";

module.exports = {

    shouldSendDm: function (message) {
        return false;
    },

    process: function (message) {
        console.log(tag, message.text);

        var characterName = message.text.match(characterNameRegex)[1];

        var params = message.text.match(statRegex);
        var stat = params[1];
        var value = params[2];

        var output = "no such character <@" + characterName + ">";

        try {
            var character = new Character()
            character.load(characterName)

            if (typeof character !== 'undefined') {
                character[stat] = parseInt(character[stat], 10) + parseInt(value, 10);
                character.save();

                output = "<@" + characterName + "> earned [" + value + "] " + stat + "\n" + character.shortStats();
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

