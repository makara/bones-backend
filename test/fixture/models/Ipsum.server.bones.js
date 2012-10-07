models['Ipsum'].prototype.sync = function(method, model, options) {
    var Backend = Bones.plugin.backends.Ipsum.getInstance('id_ipsum', 'ipsum',
        'dolor');
    Backend.sync.call(this, method, model, options);
};
