require('./fixture');

var bonesTest = require('bones-test');
var server = bonesTest.server();

describe('Ipsum backend', function() {
    it('should be a backend', function(done) {
        server.plugin.backends.should.be.a('object');
        server.plugin.backends.should.have.property('Ipsum');
        setTimeout(done, 1);
    });

    describe('An instance', function() {
        it('should be a backend', function(done) {
            var Backend = server.plugin.backends.Ipsum.getInstance('id_dolor',
                'dolor');
            Backend.should.have.property('_count', 1);
            Backend.should.have.property('_id', 'id_dolor');
            Backend.should.have.property('_table', 'dolor');
            Backend.should.not.have.property('_extra');
            Backend.should.have.property('sync');
            Backend.sync.should.be.a('function');
            setTimeout(done, 1);
        });
    });

    describe('Ipsum model using Ipsum backend', function() {
        bonesTest.testModel(server, 'Ipsum');
        bonesTest.testModelCRUD(server, 'Ipsum', {
            id: 'ipsum',
            name: 'Ipsum'
        }, {
            another: 'Dolor'
        });
        bonesTest.testModelCRUDHTTP(server, 'Ipsum', {
            id: 'ipsum',
            name: 'Ipsum'
        }, {
            another: 'Dolor'
        });
    });

    describe('...', function() {
        it('should have only one connection for ', function(done) {
            var Backend = server.plugin.backends.Ipsum.getInstance('id_ipsum');
            Backend.should.have.property('_count', 1);
            Backend.should.have.property('_id', 'id_ipsum');
            Backend.should.have.property('_table', 'ipsum');
            Backend.should.have.property('_extra', 'dolor');
            Backend.should.have.property('sync');
            Backend.sync.should.be.a('function');
            setTimeout(done, 1);
        });
    });
});
