var Flashback = class Flashback {

    constructor() {
        this.title = "unknown";
        this.available = true;
    }

    fromJson(json) {
        this.title = json.title;
        this.available = json.available;
    }

    use(title) {
        this.title = title;
        this.available = false;
    }
}

module.exports = Flashback;