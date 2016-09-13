var Character = require('../data/character.js');

var regex = /^<@[a-zA-Z0-9]*>\s(stats|stat)$/;
var characterNameRegex = /^<@([a-zA-Z0-9]*)>\s(stats|stat)$/;

var tag = "CHARACTER SHORT STATS:";

module.exports = {

    shouldSendDm : function(message) {
        return false;
    },

    process : function(message) {
        console.log(tag, message.text);

        var name = message.text.match(characterNameRegex)[1];

        var output = "<@" + message.user + ">: no such character [<@" + name +">]";

//        try{

            var character = new Character();
            character.load(name);

            if(typeof character !== 'undefined') {
                return output = "<@" + message.user + ">: " + "\n" + character.shortStats();
            }

//        } catch (err) {}

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

