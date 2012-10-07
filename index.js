var path = require('path');

var Bones = require('bones');
var utils = Bones.utils;
var _ = Bones._;

// Add the ability to load backends.
// ---------------------------------
// The basic class that every other backends should extend from.
Bones.Backend = require(path.join(__dirname, 'server/backend'));
// Load server side wrappers for backends.
utils.wrappersServer = _(utils.wrappersServer).extend(
    utils.loadWrappers(path.join(__dirname, 'server')));
// Load backends while loading.
Bones.plugin.backends = {};
Bones.plugin.load = Bones._(Bones.plugin.load).wrap(function(parent, dir) {
    var self = parent.call(this, dir);
    self.require(dir, 'backends');
    return self;
});
// .
Bones.backends = {};

// Load me.
Bones.load(__dirname);
