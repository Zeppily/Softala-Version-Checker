var server = require('../api/index');
var expect = require('chai').expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

let updateId;

describe('Testing the projects endpoints', function () {

    // let url = "http://localhost:8000/api/projects";

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
    
    describe('Update the project on the project table', function () {
        
        let project = {
            "host": "www.example.com",
            "name": "testProject2",
            "username": "user1",
            "password": "pass"
        }
    
        it("returns status code 200 and message 'Project Updated'", function (done) {
            chai.request(server)
                    .put(`/api/projects/testProject2`)
                    .send(project)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.message).to.equal('The project has been updated')
                        done();
                    });
        })    
    })

    describe('Get the project on the project table', function () {
        
        it("returns status code 200 and message 'Projects retrieved'", function (done) {
            chai.request(server)
                .get(`/api/projects/`)
                .end((err, res) => {
                    let list = JSON.parse(res.text)
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.message).to.equal('Projects retrieved');
                    expect(list.data.length).to.equal(1);
                    done();
                });            
        })    
    })

    describe('Delete a specific project from the project table', function () {
        
        it("returns status code 200 and message 'Project Deleted'", function (done) {
            chai.request(server)
                    .delete(`/api/projects/testProject2`)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.message).to.equal('Project deleted')
                        done();
                    });
        })   
    })
});

describe('Negative Testing the projects endpoints', function () {

    // let url = "http://localhost:8000/api/projects";

    describe('Add project to the project table without all fields', function () {
            
        let project = {
            "name": "testProject2",
            "username": "user",
            "password": "pass"
        }
    
        it("Does not returns status code 201 but returns status 'error' and message 'Please provide complete details'", function (done) {
            chai.request(server)
                    .post('/api/projects/')
                    .send(project)
                    .end((err, res) => {
                        expect(res.statusCode).to.not.equal(201)
                        expect(res.body.status).to.equal('error')
                        expect(res.body.message).to.equal('Please provide complete details')
                        done();
                    });
        })    
    })
    
    describe('Update the project on the project table with invalid project name', function () {
        
        let project = {
            "host": "www.example.com",
            "name": "testProject3",
            "username": "user",
            "password": "pass"
        }
    
        it("returns status code 400 and status 'error' and message 'Cannot find fake project'", function (done) {
            chai.request(server)
                    .put(`/api/projects/fake`)
                    .send(project)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(404)
                        expect(res.body.status).to.equal('error')
                        expect(res.body.message).to.equal('Cannot find fake project')
                        done();
                    });
        })    
    })

    describe('Delete a specific project from the project table with invalid project name', function () {
        
        it("returns status code 400 and status 'error' and message 'Please provide a numeric value for id'", function (done) {
            chai.request(server)
                    .delete(`/api/projects/fake`)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(404)
                        expect(res.body.status).to.equal('error')
                        expect(res.body.message).to.equal('fake project cannot be found')
                        done();
                    });
        })   
    })
});
