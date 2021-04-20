var server = require('../api/index');
var expect = require('chai').expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe('Testing the EOL endpoints', function () {
    let eol = {
        "software_name": "nodejs",
        "version": "8.2.3",
        "eol_date": "2021-12-01"  
     }

    describe('Add single eol to the eol table', function () {
            
        it("returns status code 201 and message 'Eol Added'", function (done) {
            chai.request(server)
                    .post('/api/eols/')
                    .send(eol)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(201)
                        expect(res.body.status).to.equal('success')
                        expect(res.body.message).to.equal('EOL Added!')
                        done();
                    });
        })    
    })

    describe('Update the eol on the eol table', function () {
            
        eol = {
            "software_name": "nodejs",
            "version": "8.2.3",
            "eol_date": "2023-12-01"  
        }
    
        it("returns status code 200 and message 'EOL Updated'", function (done) {
            chai.request(server)
                    .put(`/api/eols/`)
                    .send(eol)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        expect(res.body.status).to.equal('success')
                        expect(res.body.message).to.equal('EOL updated')
                        done();
                    });
        })    
    })

    describe('Add list of eols to the eol table', function () {
        let eolList = [
            {
            "software_name": "postgreSQL",
            "version": "10.5.3",
            "eol_date": "2025-04-01"  
            },
            {
            "software_name": "CentOS",
            "version": "8.3",
            "eol_date": "2026-06-01"  
            }
        ]   
        it("returns status code 201 and message 'Eol Added'", function (done) {
            chai.request(server)
                .post('/api/eols/list')
                .send(eolList)
                .end((err, res) => {
                    console.log(res.statusCode)
                    expect(res.statusCode).to.equal(201)
                    expect(res.body.status).to.equal('success')
                    expect(res.body.message).to.equal('Eol added!')
                    done();
                });
        })    
    })

    describe('Get all data from eol table', function () {

        it("returns status code 200 and message 'EOLs retrieved'", function (done) {
            chai.request(server)
                .get(`/api/eols/`)
                .end((err, res) => {
                    let list = JSON.parse(res.text)
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.message).to.equal('EOLs retrieved');
                    expect(list.data.length).to.equal(3);
                    done();
                });
        })
    })

    describe('Get project specific data from eol table', function () {
        let projId;
        let project = {
            "host": "www.example.com",
            "name": "testProject",
            "username": "user",
            "password": "pass",
            "uptime": 25
        }

        let projectSoftwareList = [
            {
                "project_name": "testProject",
                "software_name": "postgreSQL",
                "installed_version": "10.5.3" 
            },
            {
                "project_name": "testProject",
                "software_name": "nodejs",
                "installed_version": "8.2.3"
            }
        ]

        it("project added", function (done) {
            chai.request(server)
                .post('/api/projects/')
                .send(project)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201)
                    expect(res.body.message).to.equal('Project Added!')
                    projId = res.body.data.project_id
                    done();
                });
        })

        it("project software added", function (done) {
            chai.request(server)
                .post('/api/projectsoftwares/list')
                .send(projectSoftwareList)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201)
                    expect(res.body.message).to.equal('Software for the project Added!')
                    done();
                });
        })

        it("get all project specific eol", function (done) {
            chai.request(server)
                .get(`/api/eols/${project.name}`)
                .end((err, res) => {
                    let resBody = JSON.parse(res.text)
                    expect(res.statusCode).to.equal(200);
                    expect(resBody.data.length).to.equal(2);
                    done();
                })
        })
       
        let projSoft1 = {
            "project_name": "testProject",
            "software_name": "postgreSQL",
            "installed_version": "10.5.3" 
        };

        let projSoft2 = {
            "project_name": "testProject",
            "software_name": "nodejs",
            "installed_version": "8.2.3"
        }

        it("delete project software list item 1", function (done) {
            chai.request(server)
                .delete(`/api/projectsoftwares/`)
                .send(projSoft1)
                .end((err, res) => {
                    //  console.log(res)
                    expect(res.statusCode).to.equal(200)
                    expect(res.body.message).to.equal('Software deleted from project')
                    done();
                })
        });

        it("delete project software list item 2", function (done) {
            chai.request(server)
                .delete(`/api/projectsoftwares/`)
                .send(projSoft2)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body.message).to.equal('Software deleted from project')
                    done();
                })
        });
    
        it('Delete software 1', function (done) {
            chai.request(server)
                .delete(`/api/softwares/postgreSQL`)
                // .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
        
        it('Delete software 2', function (done) {
            chai.request(server)
                .delete(`/api/softwares/nodejs`)
                // .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
        
        it("delete project", function (done) {
            chai.request(server)
                .delete(`/api/projects/testProject`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body.message).to.equal('Project deleted')
                    done();
                });
        })

        // it("delete software 1", function (done) {
        //     chai.request(softwareUrl)
        //         .delete(`/${projId}`)
        //         .end((err, res) => {
        //             expect(res.statusCode).to.equal(200)
        //             expect(res.body.message).to.equal('Project deleted')
        //             done();
        //         });
        // })
    });

    describe('Delete the eols on the eol table', function () {
        let eolList1 = {
            "software_name": "postgreSQL",
            "version": "10.5.3",
            "eol_date": "2025-04-01"  
        };

        let eolList2 = {
            "software_name": "CentOS",
            "version": "8.3",
            "eol_date": "2026-06-01"  
        }

        it("Deleted first EOL returns status code 200 and message 'EOL deleted'", function (done) {
            chai.request(server)
                .delete(`/api/eols/`)
                .send(eol)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body.message).to.equal('EOL deleted')
                    done();
                });           
        })
        
        it("Delete eol list item 1", function (done) {
            chai.request(server)
                .delete(`/api/eols/`)
                .send(eolList1)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body.message).to.equal('EOL deleted')
                    done();
                });           
        }) 
        
        it("Delete eol list item 2", function (done) {
            chai.request(server)
            .delete(`/api/eols/`)
            .send(eolList2)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.message).to.equal('EOL deleted')
                done();
            });           
        })
    })
})

describe('Negative Testing the eol endpoints', function () {

    let url = "http://localhost:8000/api/eols";

    describe('Add eol to the eol table without all fields', function () {
            
        let eol = {
            "software_name": "nodejs",
            "version": "8.2.3" 
         }
    
        it("Does not returns status code 201 but returns status 'error' and message 'Please provide complete details'", function (done) {
            chai.request(server)
                    .post('/api/eols/')
                    .send(eol)
                    .end((err, res) => {
                        expect(res.statusCode).to.not.equal(201)
                        expect(res.body.status).to.equal('error')
                        expect(res.body.message).to.equal('Please provide complete details')
                        done();
                    });
        })    
    })
    
    describe('Try to update an eol not on the eol table', function () {
        
        let eol = {
            "software_name": "fakeSoftware",
            "version": "8.2.3",
            "eol_date": "2023-12-01"  
        }
    
        it("returns status code 404 and status 'error' and message 'Cannot find EOL with the software: fakeSoftware and version: 8.2.3'", function (done) {
            chai.request(server)
                    .put('/api/eols/')
                    .send(eol)
                    .end((err, res) => {
                        expect(res.statusCode).to.equal(404)
                        expect(res.body.status).to.equal('error')
                        expect(res.body.message).to.equal('Cannot find EOL with the software: fakeSoftware and version: 8.2.3')
                        done();
                    });
        })    
    })

    describe('Try to delete a specific eol not on the eol table', function () {
        let eol = {
            "software_name": "fakeSoftware",
            "version": "8.2.3",
            "eol_date": "2023-12-01"  
        }
        
        it("returns status code 404 and status 'error' and message 'EOL with the software fakeSoftware and version 8.2.3 cannot be found'", function (done) {
            chai.request(server)
                .delete('/api/eols/')
                .send(eol)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(404)
                    expect(res.body.status).to.equal('error')
                    expect(res.body.message).to.equal('EOL with the software fakeSoftware and version 8.2.3 cannot be found')
                    done();
                });
        })   
    })

    describe('Try to get project specific data from eol table using fake project', function () {

        it("get all project specific eol", function (done) {
            chai.request(server)
                .get('/api/eols/fakeProject')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body.status).to.equal('success')
                    expect(res.body.message).to.equal('No eol information available for fakeProject project')
                    done();
                })
        })        
    });
});