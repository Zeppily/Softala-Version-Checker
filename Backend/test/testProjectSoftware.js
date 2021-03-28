var server = require('../api/index');
var expect = require('chai').expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

// This is used in updating and deleting the added software
let updateId;

describe('Test projectSoftware endpoints and table', function() {
    describe('Get data from software table', function() {
        let url = 'http://localhost:8000/api/projectsoftwares'

        it('returns status 200', function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });

    describe('Add data to project_software table', function() {
        let projectsoftware = {
            project_id: "1",
            software_id: "7",
            installed_version: "9.13"
        }

        it('Expects status code 201', function (done) {
            chai.request(server)
                .post('/api/projectsoftwares/')
                .send(projectsoftware)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201)
                    updateId = res.text
                    done();
                });
        });
    });

    describe('Test PUT request', function () {

        it('Expects status code 200', function (done) {
            let projectsoftware = {
                project_id: "1",
                software_id: "7",
                installed_version: "9.13"
            }
            chai.request(server)
                .put('/api/projectsoftwares/' + updateId)
                .send(projectsoftware)
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
                .delete('/api/projectsoftwares/' + updateId)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });

    describe('Test get project specific software from Raahe server', function(){
        let url = 'http://localhost:8000/api/projectsoftwares/Raahe'

        it('Exprcts status 200', function(done) {
            chai.request(url, function(error, response, body){
                expect(response.statusCode).equal.to(200);
                done();
            });
        });
    });

});