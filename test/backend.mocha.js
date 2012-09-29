require('./fixture');

var bonesTest = require('bones-test');
var server = bonesTest.server();

describe('Backend', function() {
    describe('Bones', function() {
        it('should have backends', function(done) {
            server.plugin.should.be.a('object');
            server.plugin.should.have.property('backends');
            server.plugin.backends.should.be.a('object');
            setTimeout(done, 1);
        });
    });

    describe('Lorem backend', function() {
        it('should be a backend', function(done) {
            server.plugin.backends.should.be.a('object');
            server.plugin.backends.should.have.property('Lorem');
            setTimeout(done, 1);
        });

        it('should have a custom function', function(done) {
            var Test = new server.plugin.backends.Lorem();
            Test.should.be.a('object');
            Test.should.have.property('custom');
            Test.custom.should.be.a('function');
            Test.custom().should.equal('1f4a1137268b8e384e50d0fb72c627c4');
            setTimeout(done, 1);
        });
    });

    describe('Lorem model using Lorem backend', function() {
        bonesTest.testModel(server, 'Lorem');
        bonesTest.testModelCRUD(server, 'Lorem', {
            id: 'lorem',
            name: 'Lorem'
        }, {
            another: 'Ipsum'
        });
        bonesTest.testModelCRUDHTTP(server, 'Lorem', {
            id: 'lorem',
            name: 'Lorem'
        }, {
            another: 'Ipsum'
        });
    });
});
