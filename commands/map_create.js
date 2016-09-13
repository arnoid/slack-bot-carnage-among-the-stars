var Map = require('../data/map.js')

var regex = /^create map?$/;

var tag = "MAP:"

module.exports = {

    shouldSendDm : function(message) {
        return false;
    },

    process : function(message) {
        console.log(tag, message);

        var map = new Map(message.channel);

        console.log(map)
        map.save();

        var output
        if(message.text.match(regex)[1]) {
            output = "<@" + message.user + "> \n" + map.toString(map)
        }else {
            output = "<@" + message.user + "> \n" + map.shortToString(map);
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

