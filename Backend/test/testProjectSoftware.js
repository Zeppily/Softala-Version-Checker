var server = require('../api/index');
var expect = require('chai').expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

// // This is used in updating and deleting the added software
let updateId;
// let url = 'http://localhost:8000/api/projectsoftwares'
// let projectUrl = 'http://localhost:8000/api/projects'

describe('Test projectSoftware endpoints and table', function() {
    
    describe('Add project to the project table', function () {
            
        let project = {
            "host": "www.example.com",
            "name": "testProject2",
            "username": "user",
            "password": "pass"
        }
    
        it("returns status code 201 and message 'Project Added'", function (done) {
            chai.request(server)
                    .post('/api/projects/')
                    .send(project)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(201)
                        expect(res.body.message).to.equal('Project Added!')
                        updateId = res.body.data.project_id
                        done();
                    });
        })    
    })

    describe('Add data to project_software table', function() {
        let projectsoftware = {
            project_name: "www.example.com",
            software_name: "testSoftware",
            installed_version: "9.13"
        }

        it('Expects status code 201', function (done) {
            chai.request(server)
                .post('/api/projectsoftwares/')
                .send(projectsoftware)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201)
                    done();
                });
        });
    });

    describe('Test PUT request', function () {

        it('Expects status code 200', function (done) {
            let projectsoftware = {
                project_name: "testProject2",
                software_name: "testSoftware",
                installed_version: "10.0"
            }
            chai.request(server)
                .put('/api/projectsoftwares/')
                .send(projectsoftware)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });

    describe('Get data from software table', function() {

        it('returns status 200', function(done) {
            chai.request(server)
                .get(`/api/projectsoftwares/`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
            // request(url, function(error, response, body) {
            //     expect(response.statusCode).to.equal(200);
            //     done();
            // });
        });
    });

//     // THIS DOESNT WORK: NEEDS FIXING!!!
//     // describe('Test get project specific software from testProject2 server', function(){
//     //     let url = 'http://localhost:8000/api/projectsoftwares/testProject2'

//     //     it('Expects status 200', function(done) {
//     //         chai.request(url, function(error, response, body){
//     //             expect(response.statusCode).equal.to(200);
//     //             done();
//     //         });
//     //     });
//     // });

    describe('Test DELETE request', function () {
        let projectsoftware = {
            project_name: "testProject2",
            software_name: "testSoftware",
            installed_version: "10.0"
        }

        it("delete project software from project_software table", function (done) {
            chai.request(server)
                .delete(`/api/projectsoftwares/`)
                .send(projectsoftware)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body.message).to.equal('Software deleted from project')
                    done();
                })
        });
    });

    describe('Delete the project from the project table', function () {
        
        it("returns status code 200 and message 'Project Deleted'", function (done) {
            chai.request(server)
                    .delete(`/api/projects/${updateId}`)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.message).to.equal('Project deleted')
                        done();
                    });
        })   
    })

});