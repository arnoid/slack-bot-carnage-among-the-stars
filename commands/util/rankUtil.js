var jsonfile = require('jsonfile')
var ranksFile = require('path').dirname(require.main.filename) + '/ranks.json';

module.exports = {

    load : function() {
        var ranks = require(ranksFile);

        for(key in ranks) {
            var rank = ranks[key];

            console.log("!!!!!", rank)

            rank.ordersToString = function() {
                console.log("!!!!!", this.parent)

                var AsciiTable = require('ascii-table');

                var table = new AsciiTable('Orders');
//
//                for(var i = 0; i < this.orders.length; i++) {
//                    console.log("!!!!!",rank)
//                    var order = this.orders[i];
//
//                    table.addRow(rank.order.title, rank.order.description);
//                }

                return table.toString();
            }
        }

        return ranks;
    },

    loadRank : function(character) {

        var ranks = this.load();

        var rank;

        for(key in ranks) {
            rank = ranks[key];

            var characterRank = parseInt(character.rank, 10)

            if(parseInt(rank.rank, 10) == character.rank) {

                console.log(rank.title)

                return rank;
            }
        }
    }

}
