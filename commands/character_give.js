var Character = require('../data/character.js');
var Item = require('../data/item.js');

var regex = /^<@[a-zA-Z0-9]*> give [a-zA-Z0-9 \-]*$/;
var characterNameRegex = /<@([a-zA-Z0-9]*)> give [a-zA-Z0-9 \-]*$/;
var itemNameRegex = /<@[a-zA-Z0-9]*> give ([a-zA-Z0-9 \-]*)$/;

var tag = "CHARACTER GIVE:";

module.exports = {

    shouldSendDm: function (message) {
        return false;
    },

    process: function (message) {
        console.log(tag, message.text);

        var characterName = message.text.match(characterNameRegex)[1];
        var itemName = message.text.match(itemNameRegex)[1].toUpperCase();

        var output = "<@" + message.user + ">: no such character [<@" + characterName + '>]';

//        try{
        var character = new Character()
        character.load(characterName)

        var item = Item.loadAll().find(function (item) {
            return item.title === itemName;
        });

        if (typeof item === 'undefined') {
            output = "no such item [" + itemName + ']'
        } else {
            character.addItem(item);
            character.save();

            output = "got item [" + item.title + "]";
        }
//        } catch (err) {}

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

