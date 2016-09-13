var Character = require('../data/character.js');

var regex = /^<@[a-zA-Z0-9]*> set (fa|nfa|kills|hp|totalKills|rank) [0-9]*$/;
var characterNameRegex = /^<@([a-zA-Z0-9]*)> set (fa|nfa|kills|hp|totalKills|rank) [0-9]*$/;
var skillsRegex = /^<@[a-zA-Z0-9]*> set (fa|nfa|kills|hp|totalKills|rank) ([0-9]*)$/;

var tag = "CHARACTER SET KILLS:";

module.exports = {

    shouldSendDm : function(message) {
        return false;
    },

    process : function(message) {
        console.log(tag, message.text);

        var characterName = message.text.match(characterNameRegex)[1];
        var params = message.text.match(skillsRegex);
        var skill = params[1];
        var value = params[2];


        var output = "No such character <@" + characterName + ">";

        try {
            var character = new Character()
            character.load(characterName)

            if(typeof character !== 'undefined') {
                character[skill] = value;
                character.save();

                output = "<@" + characterName + "> " + skill.toUpperCase() + " set to [" + value + "]\n" + character.shortStats();
            }
        } catch(err) {
            console.log(err)
        }

        return output;
    },

    identify : function(commandText) {
        var result;
        if(commandText.match(regex)) {
            console.log(tag, "matches message [" + commandText + "]");
            result = true;
        } else {
            console.log(tag, "NOT matches message [" + commandText + "]");
            result = false;
        }

        return result;
    }

}

