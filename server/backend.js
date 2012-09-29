var Bones = require(global.__BonesPath__ || 'bones');

var $ = Bones.$, jQuery = $;
var _ = Bones._;
var Backbone = Bones.Backbone;

module.exports = Backend;
function Backend() {
    this.initialize.apply(this, arguments);
};

Backend.prototype.initialize = function() {};

Backend.augment = Backbone.Router.augment;
Backend.extend = Backbone.Router.extend;
