var Map = class Map {

    constructor(mapRoomName) {
        this.roomName = mapRoomName;
        this.close = [];
        this.near = [];
        this.far = [];
        this.alienToken = 0;
        this.alienAbility = 0;
        this.planet = "";
        this.mission = "";
        //aliens
        this.alienAbilityDescription = "";
        this.alienDescription = "";
    }

    fromJson(json) {

        var keys = Object.keys(json)
        console.log(keys)
        for (var i in keys) {
            var key = keys[i]
            console.log(this[key], " = ", json[key])
            this[key] = json[key]
        }

        console.log(this)

        this.roomName = json.roomName;
        this.close = json.close;
        this.near = json.near;
        this.far = json.far;
        this.alienToken = json.alienToken;
        this.alienAbility = json.alienAbility;
        this.planet = json.planet;
        this.mission = json.mission;
        //aliens
        this.alienAbilityDescription = json.alienAbilityDescription;
        this.alienDescription = json.alienDescription;
    }

    moveCharacterToRange(characterName, rangeName) {

        var filter = function (item){
            return item !== characterName
        };

        this.close = this.close.filter(filter)
        this.near = this.near.filter(filter)
        this.far = this.far.filter(filter)

        this[rangeName].push(characterName)
    }

    removeCharacterFromRange(characterName, range) {
        var position = range.indexOf(characterName)

        console.log(position + " = " + (position !== -1))

        if (position !== -1) {
            delete range[position]
        }

    }

    load() {

        try {
            var jsonfile = require('jsonfile')
            var mapFile = require('path').dirname(require.main.filename) + '/content/map/' + this.roomName + '.json';
            var mapJson = jsonfile.readFileSync(mapFile)

            this.fromJson(mapJson);

        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    save() {

        var jsonfile = require('jsonfile')
        var mapFile = require('path').dirname(require.main.filename) + '/content/map/' + this.roomName + '.json';

        jsonfile.writeFileSync(
            mapFile,
            this
        )
    }

    shortToString() {

        var AsciiTable = require('ascii-table')

        var mapTable = new AsciiTable('Map')

        var mapToSlackUserName = function (characterName) {
            return '@' + characterName
        }

        mapTable
            .addRow('Alien Skill', '' + this.alienAbility)
            .addRow('Alien Tokens', '' + this.alienToken)
            .addRow('Close', '' + this.close.map(mapToSlackUserName))
            .addRow('Near', '' + this.near.map(mapToSlackUserName))
            .addRow('Far', '' + this.far.map(mapToSlackUserName))

        return '```' + mapTable.toString() + '```';
    }

    toString() {

        var output = this.shortToString();

        output = output + '\n*Mission*\n' + this.mission;
        output = output + '\n*Planet*\n' + this.planet;
        output = output + '\n*Aliens*';
        output = output + '\n*Special ability*\n' + this.alienAbilityDescription;
        output = output + '\n*Description*\n' + this.alienDescription;

        return output;
    }
}

module.exports = Map;