var commandsMap = {

    roll: require('./commands/roll.js'),
    sarge: require('./commands/sarge.js'),

    map_stat: require('./commands/map_stat.js'),
    map_create: require('./commands/map_create.js'),
    map_set: require('./commands/map_set.js'),
    map_add: require('./commands/map_add.js'),

    character_create: require('./commands/character_create.js'),
    character_hitpoints: require('./commands/character_hitpoints.js'),
    character_stats_set: require('./commands/character_stats_set.js'),
    character_stats_add: require('./commands/character_stats_add.js'),
    character_orders: require('./commands/character_orders.js'),

    character_flashback_add: require('./commands/character_flashback_add.js'),
    character_flashback_use: require('./commands/character_flashback_use.js'),

    character_stats_short: require('./commands/character_stats_short.js'),
    character_stats_full: require('./commands/character_stats_full.js'),

    items_list: require('./commands/items_list.js'),
    items_stat: require('./commands/items_stat.js'),

    character_give: require('./commands/character_give.js'),
    character_remove: require('./commands/character_remove.js'),
}
module.exports = {

    parseCommand: function (commandText) {
        console.log("COMMANDS:", commandText);

        var command;

        for (var key in commandsMap) {
            var currentCommand = commandsMap[key];
            if (currentCommand.identify(commandText)) {
                command = currentCommand
                break;
            }
        }

        return command;
    }
}

