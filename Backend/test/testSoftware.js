var server = require('../api/index');
var expect = require('chai').expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

// This is used in updating and deleting the added software
let updateId;

describe('Test software endpoints and table', function() {
        
    describe('Add data to software table', function() {
        let software = {
            name: "test",
            latest_version: "15"
        }

        it('Expects status code 201', function (done) {
            chai.request(server)
                .post('/api/softwares/')
                .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201)
                    updateId = res.body.data.software_id
                    done();
                });
        });
    });

    describe('Test PUT request', function () {

        it('Expects status code 200', function (done) {
            let software = {
                name: "updatedTest",
                latest_version: "11(LTS)"
            }

            chai.request(server)
                .put(`/api/softwares/test`)
                .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });

    describe('Get data from software table', function() {
        let url = 'http://localhost:8000/api/softwares'

        it('returns status 200', function(done) {
            chai.request(server)
                .get(`/api/softwares/`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });

    describe('Test DELETE request', function () {
        let software = {
            name: "updatedTest",
            latest_version: "11(LTS)"
        }

        it('Expects status 200', function (done) {
            chai.request(server)
                .delete(`/api/softwares/updatedTest`)
                .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });

    describe('Test incorrect POST request', function() {

        let software = {
            name: "test"
        }

        it('Expects status 400', function(done) {
            chai.request(server)
                .post('/api/softwares/')
                .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(400)
                    done();
                });
        });
    });

    describe('Test incorrect PUT request', function() {

        let software = {
            name: "testUpdated",
            latest_version: 123
        }

        it('Expects status 400', function(done) {
            chai.request(server)
                .put('/api/softwares/testUpdated')
                .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404)
                    done();
                });
        });
    });
});