var stores = {};
var instances = {};

// Simulate a backend that hates too many instances.
backend = Bones.Backend.extend({
    initialize: function(table, extra) {
        table || (table = 0);
        this._table = table;
        this._extra = extra;
        this._count = instances[table] || (instances[table] = 0);
        this._count++;

        this.sync = function(method, model, options) {
            options || (options = {});
            var success = options.success || function() {};
            var error = options.error || function() {};

            var store = stores[table] || (stores[table] = {});

            var id = model.get('id') || null;
            if (!id) return error('ID is required');

            if (method === 'read') {
                return store[id] ? success(store[id])
                    : error('Model not found.');
            } else if (method === 'create' || method === 'update') {
                store[id] = model.toJSON();
            } else if (method === 'delete') {
                delete store[id];
            }
            success(store[id] || {});
        };
    }
});
