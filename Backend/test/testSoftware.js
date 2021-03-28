var server = require('../api/index');
var expect = require('chai').expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

// This is used in updating and deleting the added software
let updateId;

describe('Test software endpoints and table', function() {
    describe('Get data from software table', function() {
        let url = 'http://localhost:8000/api/softwares'

        it('returns status 200', function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
    
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
                    updateId = res.text
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
                .put('/api/softwares/' + updateId)
                .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    console.log(updateId);
                    done();
                });
        });
    });

    describe('Test DELETE request', function () {

        it('Expects status 200', function (done) {
            chai.request(server)
                .delete('/api/softwares/' + updateId)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });

    describe('Test incorrect POST request', function() {

        let software = {
            name: "test",
            latest_version: 123
        }

        it('Expects status 404', function(done) {
            chai.request(server)
                .post('/api/softwares/')
                .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404)
                    updateId = res.text
                    done();
                });
        });
    });

    describe('Test incorrect PUT request', function() {

        let software = {
            name: "testUpdated",
            latest_version: 123
        }

        it('Expects status 404', function(done) {
            chai.request(server)
                .put('/api/softwares/' + updateId)
                .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404)
                    done();
                });
        });
    });
});