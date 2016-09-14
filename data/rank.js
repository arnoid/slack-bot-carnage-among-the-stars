var Order = require('./order.js')

var Rank = class Rank {
    constructor() {
        this.rank = 0;
        this.title = "";
        this.description = "";
        this.orders = [];
    }

    fromJson(json) {
        this.rank = json.rank;
        this.title = json.title;
        this.description = json.description;

        this.orders = [];
        for (var i in json.orders) {
            var jsonOrder = json.orders[i];

            var order = new Order()
            order.fromJson(jsonOrder);
            this.orders.push(order)
        }
    }

    ordersToString() {
        var AsciiTable = require('ascii-table')

        var table = new AsciiTable('Orders')

        for (var i = 0; i < this.orders.length; i++) {
            var order = this.orders[i]
            table.addRow(order.title, order.description)
        }

        return '```' + table.toString() + '```';
    }
}

var loadAll = function loadAll() {

    var ranks = [];
    var jsonfile = require('jsonfile')
    try {

        var ranksFile = require('path').dirname(require.main.filename) + '/content/ranks.json';
        var ranksJson = jsonfile.readFileSync(ranksFile)

        for (var i in ranksJson) {
            var rankJson = ranksJson[i]

            var rank = new Rank()
            rank.fromJson(rankJson);
            ranks.push(rank)
        }

    } catch (err) {
        console.log("ERROR:", "Unable to load ranks json\n" + err)

        throw err;
    }

    return ranks;
}


module.exports = Rank
module.exports.loadAll = loadAll;