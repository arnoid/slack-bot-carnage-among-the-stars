var CONFIG = CONFIG || require('./config.json');
var BOT;

var RtmClient = require('@slack/client').RtmClient;
var WebClient = require('@slack/client').WebClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;

var commands = require('./commands.js');
var nok = require('./nok.json');

var path = require('path');
var appDir = path.dirname(require.main.filename);

var BOT;

var rtm = new RtmClient(CONFIG.token, {
        logLevel: 'debug',
        dataStore: new MemoryDataStore(),
        autoReconnect: true
    });

var web = new WebClient(CONFIG.token);

rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
        BOT = BOT || rtmStartData
        BOT.self.inlineName = '<@' + BOT.self.id + '>'
    });

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
        console.log('Message:', message);

        if(typeof message.text === 'undefined') {
            return;
        }

        if(message.user == BOT.self.name) {
            return;
        }

        if(typeof message.subtype !== 'undefined') {
            return;
        }

        var output;

        console.log('Command for BOT received:', message.text);
        var command = commands.parseCommand(message.text)
        var shouldSendDm;

        if ( typeof command === 'undefined' ) {
            console.log("[" + message.text + "] cannot be handled" )
        } else {
            console.log(command);
            output = command.process(message);
            shouldSendDm = command.shouldSendDm();

            var channel;

//            if(shouldSendDm) {
//                channel = rtm.dataStore.getDMByName(message.user.name);
//            } else {
                console.log(message.user)
                channel = message.channel;
//            }

            var data = {
                type: "message",
                subtype: "BOT_message",
                channel: channel,
                text: output,
            };
//
//            web.chat.postMessage(message.channel, '', data, function() {});

            rtm.send(data, function handleMessageSent() {});

            console.log("OUTPUT:",output);
        }
    });

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
        console.log('Reaction added:', reaction);
    });

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
        console.log('Reaction removed:', reaction);
    });
