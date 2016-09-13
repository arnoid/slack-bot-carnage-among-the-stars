var jsonfile = require('jsonfile')
var itemsFile = require('path').dirname(require.main.filename) + '/items.json';

module.exports = {

    loadAll : function() {
        var items = require(itemsFile);

        items.toString = function() {
            var AsciiTable = require('ascii-table');

            var table = new AsciiTable('Items');

            var itemNames = Object.keys(items)

            for(key in itemNames) {
                key = Object.keys(items)[key];

                if( typeof items[key] !== 'object') {
                    continue;
                }

                var item = items[key];

                var prefix;

                if(item.oneUse) {
                    prefix = "[*]"
                } else {
                    prefix = "[ ]"
                }

                console.log(item.title);

                table.addRow(prefix + item.title);
            }

            return "```" + table.toString() + "```";
        }

        return items;
    },

    load : function(itemName) {

        var item = this.loadAll()[itemName.toUpperCase()];

        if(typeof item === 'undefined') {
            console.log("ERROR:", "Unable to load item [" + itemName + "]\n")
            return;
        }

        item.toString = function() {


            var AsciiTable = require('ascii-table');

            var table = new AsciiTable();

            table .setHeading('close', 'near', 'far', 'single use');

            table.addRow(item.close, item.near, item.far, item.oneUse);

            return "```" + item.title + "\n" + table.toString() + "\n" + item.description + "```";
        }

        return item;
    },

}