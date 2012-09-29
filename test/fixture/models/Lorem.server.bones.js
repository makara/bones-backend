models['Lorem'].prototype.sync = function(method, model, options) {
    var Backend = new Bones.plugin.backends.Lorem();
    Backend.sync.call(this, method, model, options);
};
