var Item = require('./item.js');
var Flashback = require('./flashback.js');

const MAX_HP = 3;

const hpLabels = [
    "Dead",
    "Crippled",
    "Messed",
    "OK"
]

var Character = class Character {

    constructor(name) {
        this.name = name;
        this.hp = MAX_HP;
        this.kills = 0;
        this.totalKills = 0;
        this.rank = 0;
        this.fa = 0;
        this.nfa = 0;

        this.items = {};
        this.weakness = [];
        this.strength = [];
    }

    fromJson(json) {
        this.name = json.name;
        this.hp = json.hp;
        this.kills = json.kills;
        this.totalKills = json.totalKills;
        this.rank = json.rank;
        this.fa = json.fa;
        this.nfa = json.nfa;

        this.items = {};
        for (var i in json.items) {
            var jsonItem = json.items[i];

            var item = new Item()
            item.fromJson(jsonItem);
            this.items[item.title] = item;
        }

        this.weakness = [];
        for (var i in json.weakness) {
            var jsonWeakness = json.weakness[i];

            var currentWeakness = new Flashback()
            currentWeakness.fromJson(jsonWeakness);
            this.weakness.push(currentWeakness)
        }

        this.strength = [];
        for (var j in json.strength) {
            var jsonStrength = json.strength[j];

            var currentStrength = new Flashback();
            currentStrength.fromJson(jsonStrength);
            this.strength.push(currentStrength)
        }
    }

    load(name) {

        var jsonfile = require('jsonfile')
        try {

            var characterJFile = require('path').dirname(require.main.filename) + '/content/characters/' + name + '.json';
            var characterJson = jsonfile.readFileSync(characterJFile)

            this.fromJson(characterJson);

            characterJson
        } catch (err) {
            console.log("ERROR:", "Unable to load character [<@" + name + ">]\n" + err)

            throw err;
        }
    }

    save() {

        var jsonfile = require('jsonfile')
        var characterFile = require('path').dirname(require.main.filename) + '/content/characters/' + this.name + '.json';

        jsonfile.writeFileSync(
            characterFile,
            this,
            {},
            function (err, obj) {
                console.log(obj)
            }
        )

        console.log(this)
    }

    shortStats() {
        var AsciiTable = require('ascii-table');

        var table = new AsciiTable();

        table.addRow('**HP**', this.hp, '**FA**', this.fa);
        table.addRow('**KILLS**', this.kills + "/" + this.totalKills, '**NFA**', this.nfa);
        table.addRow('Strength', this.calculateStrength(), 'Weakness', this.calculateWeakness());
        table.addRow('**Items**', '**close**', '**near**', '**far**');

        var itemKeys = Object.keys(this.items)

        for (var key in itemKeys) {
            var currentItem = this.items[itemKeys[key]];

            var itemProfile = currentItem.profiles.current;

            if (itemProfile.close === '-' &&
                itemProfile.near === '-' &&
                itemProfile.far === '-') {
                //ignore this for short stats
            } else {
                table.addRow((currentItem.singleUse ? '[*]' : '[ ]') + currentItem.title, itemProfile.close, itemProfile.near, itemProfile.far);
            }
        }

        return "<@" + this.name + ">\n ```" + table.toString() + "```";
    }

    addItem(item) {
        this.items[item.title] = item;
    }

    removeItem(item) {
        delete this.items[item.title];
    }

    calculateFlashbacks(flashbacks) {
        var total = 0;
        var available = 0;
        for (key in this.flashbacks) {
            var flashback = this.flashbacks[key];
            total = total + 1;
            if (flashback.available) {
                available = available + 1;
            }
        }

        return total + "/" + available;
    }

    calculateWeakness() {
        return this.calculateFlashbacks(this.weakness);
    }

    calculateStrength() {
        return this.calculateFlashbacks(this.strength);
    }

    addFlashback(flashbacksType) {
        this[flashbacksType].push(new Flashback());
    }

    useFlashback(flashbackType, title) {
        var used = false;
        var flashbackStorage = this[flashbackType]

        console.log(this)

        var flashback;

        for (var key in flashbackStorage) {
            var tempFlashback = flashbackStorage[key];

            if (tempFlashback.available) {
                flashback = tempFlashback;
                break;
            }
        }

        if (typeof flashback !== 'undefined') {
            flashback.use(title);

            used = true;
        }

        return used;
    }

    generateHpLabel() {

        //hp label offset
        const offset = 1;
        var hp = '';
        for (var i = offset; i < MAX_HP + offset; i++) {
            if (this.hp < i) {
                hp = hp + '[ ]'
            } else {
                hp = hp + '[#]'
            }
        }

        return hp;
    }

    generateHpDescriptionLabel() {
        return "(" + this.hp + ") " + hpLabels[this.hp];
    }

    hpToString() {
        var AsciiTable = require('ascii-table');

        var table = new AsciiTable();

        var hpTextLabel = "(" + this.hp + ") " + hpLabels[this.hp]

        table.addRow('hp', this.generateHpLabel(), this.generateHpDescriptionLabel());

        return "```" + table.toString() + "```";
    }

    fullStats() {
        var AsciiTable = require('ascii-table');

        var table = new AsciiTable();

        table.addRow('**HP**', this.hp, '**FA**', this.fa);
        table.addRow('**KILLS**', this.kills + "/" + this.totalKills, '**NFA**', this.nfa);
        table.addRow('Strength', this.calculateStrength(), 'Weakness', this.calculateWeakness());
        table.addRow('**Items**', '**close**', '**near**', '**far**');

        var itemKeys = Object.keys(this.items)

        for (var key in itemKeys) {
            var currentItem = this.items[itemKeys[key]];

            var itemProfile = currentItem.profiles.current;

            table.addRow((currentItem.singleUse ? '[*]' : '[ ]') + currentItem.title, itemProfile.close, itemProfile.near, itemProfile.far);
        }

        table.addRow('**Strength**', 'available', '**Weakness**', 'available');

        for (var w = 0, s = 0; w < this.weakness.length || s < this.strength.length; w++, s++) {
            var currentWeakness = this.weakness[w];
            var currentStrength = this.strength[s];

            var line = [];

            if (typeof currentStrength === 'undefined') {
                line.push('')
                line.push('')
            } else {
                line.push(currentStrength.title)
                line.push(currentStrength.available)
            }

            if (typeof currentWeakness === 'undefined') {
                line.push('')
                line.push('')
            } else {
                line.push(currentWeakness.title)
                line.push(currentWeakness.available)
            }

            table.addRow(line);
        }

        return "```" + table.toString() + "```";
    }

}

module.exports = Character;