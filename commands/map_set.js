var Map = require('../data/map.js')

var regex = /^set map (planet|mission|aa description|a description|at planet|aa|at|atp) ([0-9a-zA-Z .,\n]*)$/;

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
        } else if (/^(atp|at planet)$/.test(mapKey)) {
            mapKey = 'alienTokenPlanet'
        } else if (/^at$/.test(mapKey)) {
            mapKey = 'alienToken'
        } else if (/^planet$/.test(mapKey)) {
            mapKey = 'planet'
        } else if (/^mission$/.test(mapKey)) {
            mapKey = 'mission'
        } else if (/^aa description$/.test(mapKey)) {
            mapKey = 'alienAbilityDescription'
        } else if (/^a description$/.test(mapKey)) {
            mapKey = 'alienDescription'
        }

        map[mapKey] = params[2];

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

