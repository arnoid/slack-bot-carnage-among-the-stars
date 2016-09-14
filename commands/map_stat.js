var Map = require('../data/map.js')

var regex = /^map( full)?$/;

var tag = "MAP:"

module.exports = {

    shouldSendDm: function (message) {
        return false;
    },

    process: function (message) {
        console.log(tag, message);

        console.log(Map)

        var output

        var map = new Map(message.channel);

        try {
            map.load();

            if (message.text.match(regex)[1]) {
                output = "<@" + message.user + "> \n" + map.toString();
            } else {
                output = "<@" + message.user + "> \n" + map.shortToString();
            }
        } catch (err) {
            console.log(err)
            output = "<@" + message.user + "> there is no map.";
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

