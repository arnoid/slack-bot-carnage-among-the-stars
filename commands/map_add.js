var Map = require('../data/map.js')

var regex = /^map (aa|c|n|f|at|atp) ([-+0-9]*)$/;

var tag = "MAP SET:"

module.exports = {

    shouldSendDm: function (message) {
        return false;
    },

    process: function (message) {
        console.log(tag, message);

        var map = new Map(message.channel);
        map.load(message.channel);

        var params = message.text.match(regex);

        var mapKey = params[1].toLowerCase().trim();

        if (/^aa$/.test(mapKey)) {
            mapKey = 'alienAbility'
        } else if (/^(atp)$/.test(mapKey)) {
            mapKey = 'alienTokenPlanet'
        } else if (/^at$/.test(mapKey)) {
            mapKey = 'alienToken'
        } else if (/^c$/.test(mapKey)) {
            mapKey = 'close'
        } else if (/^n$/.test(mapKey)) {
            mapKey = 'near'
        } else if (/^f$/.test(mapKey)) {
            mapKey = 'far'
        }

        console.log("!!!!!", parseInt(map[mapKey], 10) + parseInt(params[2], 10))

        map[mapKey] = parseInt(map[mapKey], 10) + parseInt(params[2], 10);

        map.save();

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

