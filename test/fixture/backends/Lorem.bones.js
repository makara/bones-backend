var store = {};

backend = Bones.Backend.extend({
    custom: function() {
        return '1f4a1137268b8e384e50d0fb72c627c4';
    },
    sync: function(method, model, options) {
        options || (options = {});
        var success = options.success, error = options.error;

        var id = model.get('id') || null;
        if (!id) return error('ID is required');

        if (method === 'read') {
            return store[id] ? success(store[id]) : error('Model not found.');
        } else if (method === 'create' || method === 'update') {
            store[id] = model.toJSON();
        } else if (method === 'delete') {
            delete store[id];
        }
        success(store[id] || {});
    }
});
