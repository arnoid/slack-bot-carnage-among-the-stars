var Map = require('../data/map.js')

var regex = /^move (f|far|n|near|c|close) <@([a-zA-Z0-9]*)>$/;

var tag = "MAP MOVE CHARACTER:"

module.exports = {

    shouldSendDm: function (message) {
        return false;
    },

    process: function (message) {
        console.log(tag, message);

        var map = new Map(message.channel);
        map.load(message.channel);

        var params = message.text.match(regex);

        var rangeName = params[1].toLowerCase().trim();
        var userId = params[2]

        var characterName = message.dataStore.getUserById(userId).name

        if (/^(c|close)/.test(rangeName)) {
            rangeName = 'close'
        } else if (/^(n|near)$/.test(rangeName)) {
            rangeName = 'near'
        } else if (/^(f|far)$/.test(rangeName)) {
            rangeName = 'far'
        }

        map.moveCharacterToRange(characterName, rangeName);
        map.save()

        return "<@" + message.user + "> " + map.shortToString();
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

