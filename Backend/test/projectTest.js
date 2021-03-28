var request = require("request");
var chai = require('chai');
var chaiHttp = require("chai-http");
const { expect } = require("chai");


chai.use(chaiHttp);

let updateId;

describe('Testing the projects endpoints', function () {

    let url = "http://localhost:8000/api/projects";

    describe('Add project to the project table', function () {
            
        let project = {
            "host": "www.example.com",
            "name": "testProject2",
            "username": "user",
            "password": "pass"
        }
    
        it("returns status code 201 and message 'Project Added'", function (done) {
            chai.request(url)
                    .post('/')
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
            "name": "testProject3",
            "username": "user",
            "password": "pass"
        }
    
        it("returns status code 200 and message 'Project Updated'", function (done) {
            chai.request(url)
                    .put(`/${updateId}`)
                    .send(project)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.message).to.equal('Project updated')
                        done();
                    });
        })    
    })

    describe('Get the project on the project table', function () {
        
        it("returns status code 200 and message 'Projects retrieved'", function (done) {
            request(url, function (err, res) {
                let resBody = JSON.parse(res.body)
                expect(res.statusCode).to.equal(200);
                expect(resBody.message).to.equal('Projects retrieved');
                expect(resBody.data.length).to.equal(1);
                done();
            });
        })    
    })

    describe('Delete a specific project from the project table', function () {
        
        it("returns status code 200 and message 'Project Deleted'", function (done) {
            chai.request(url)
                    .delete(`/${updateId}`)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.message).to.equal('Project deleted')
                        done();
                    });
        })   
    })
});

describe('Negative Testing the projects endpoints', function () {

    let url = "http://localhost:8000/api/projects";

    describe('Add project to the project table without all fields', function () {
            
        let project = {
            "name": "testProject2",
            "username": "user",
            "password": "pass"
        }
    
        it("Does not returns status code 201 but returns status 'error' and message 'Please provide complete details'", function (done) {
            chai.request(url)
                    .post('/')
                    .send(project)
                    .end((err, res) => {
                        expect(res.statusCode).to.not.equal(201)
                        expect(res.body.status).to.equal('error')
                        expect(res.body.message).to.equal('Please provide complete details')
                        done();
                    });
        })    
    })
    
    describe('Update the project on the project table with invalid id', function () {
        
        let project = {
            "host": "www.example.com",
            "name": "testProject3",
            "username": "user",
            "password": "pass"
        }
    
        it("returns status code 400 and status 'error' and message 'Please input a valid id'", function (done) {
            chai.request(url)
                    .put(`/fake`)
                    .send(project)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(400)
                        expect(res.body.status).to.equal('error')
                        expect(res.body.message).to.equal('Please input a valid id')
                        done();
                    });
        })    
    })

    describe('Delete a specific project from the project table with invalid id', function () {
        
        it("returns status code 400 and status 'error' and message 'Please provide a numeric value for id'", function (done) {
            chai.request(url)
                    .delete(`/fake`)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(400)
                        expect(res.body.status).to.equal('error')
                        expect(res.body.message).to.equal('Please provide a numeric value for id')
                        done();
                    });
        })   
    })
});
