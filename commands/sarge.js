var jsonfile = require('jsonfile')
var sargeCommands = require(require('path').dirname(require.main.filename) + '/content/sarge.json');

var regex = /^sarge$/;

var tag = "SARGE:"

module.exports = {

    shouldSendDm : function(message) {
        return false;
    },

    process : function(message) {
        console.log(tag, message.text);

        return sargeCommands[Math.floor(Math.random()*sargeCommands.length)];
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

