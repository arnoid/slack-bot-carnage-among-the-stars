module.exports = {

    load : function() {
        return require(require('path').dirname(require.main.filename) + '/hp_label.json');
    },

}