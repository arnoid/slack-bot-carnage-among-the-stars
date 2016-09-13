var Order = class Order {

    constructor() {
        this.title = "";
        this.description = "";
    }

    fromJson(json) {
        this.title = json.title;
        this.description = json.description;
    }
}

module.exports = Order


