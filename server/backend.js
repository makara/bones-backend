var Bones = require(global.__BonesPath__ || 'bones');

var $ = Bones.$, jQuery = $;
var _ = Bones._;
var Backbone = Bones.Backbone;

module.exports = Backend;
function Backend() {
    this.initialize.apply(this, arguments);
};

// .
Backend.construct = function() {
    var oldFunc = this;
    var newFunc = function() {};
    newFunc.prototype = oldFunc.prototype;
    var instance = new newFunc();
    instance.initialize.apply(instance, arguments);
    return instance;
};

// .
// Doesn't allow overriding an instance with different arguments (TODO).
Backend.getInstance = function(id) {
    var instance;
    if (instance = Backend.instance(id)) {
        return instance;
    }
    var args = _(arguments).chain().clone().toArray().shift().value();
    instance = this.construct.apply(this, args);
    instance._id = id;
    return Backend.instance(id, instance);
};

// .
Backend.instance = function(id, instance) {
    if (id && instance) {
        Bones.backends[id] = instance;
    }
    if (id) {
        return Bones.backends[id];
    }
    return null;
};

// .
Backend.prototype.initialize = function() {};

Backend.augment = Backbone.Router.augment;
Backend.extend = Backbone.Router.extend;
