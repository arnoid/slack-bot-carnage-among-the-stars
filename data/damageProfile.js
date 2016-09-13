var DamageProfile = class DamageProfile {

    constructor() {
        this.close = 0;
        this.near = 0;
        this.far = 0;
    }

    fromJson(json) {
        this.close = json.close;
        this.near = json.near;
        this.far = json.far;
    }
}

module.exports = DamageProfile;