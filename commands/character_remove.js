var Character = require('../data/character.js');
var Item = require('../data/item.js');

var regex = /^<@[a-zA-Z0-9]*> remove [a-zA-Z0-9 -]*$/;
var characterNameRegex = /<@([a-zA-Z0-9]*)> remove [a-zA-Z0-9 -]*$/;
var itemNameRegex = /<@[a-zA-Z0-9]*> remove ([a-zA-Z0-9 -]*)$/;

var tag = "CHARACTER REMOVE:";

module.exports = {

    shouldSendDm : function(message) {
        return false;
    },

    process : function(message) {
        console.log(tag, message.text);

        var characterName = message.text.match(characterNameRegex)[1];
        var itemName = message.text.match(itemNameRegex)[1].toUpperCase();

        var character = new Character()
        character.load(characterName)

        delete character.items[itemName];

        character.save();

        var output = "<@" + message.user + ">: [" + itemName + "] removed";

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

