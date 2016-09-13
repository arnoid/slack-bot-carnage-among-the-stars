var Character = require('../data/character.js')
var regex = /^create\s<@([a-zA-Z0-9]*)>$/;

var tag = "CHARACTER CREATE:";

module.exports = {

    shouldSendDm : function(message) {
        return false;
    },

    process : function(message) {
        console.log(tag, message.text);

        var name = message.text.match(regex)[1].trim();

        var character = new Character(name);
        character.save();

        return "<@" + message.user + ">: created";
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

