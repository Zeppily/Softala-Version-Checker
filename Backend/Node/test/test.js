var server = require('../App');
var expect = require('chai').expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require("chai-http");


chai.use(chaiHttp);

// variable to use id in tests
var updateId;

// describe what the test does
describe('Get data from DB', function () {
    describe('Raahe server', function () {
        var url = "http://localhost:8080/info/Raahe";

        // it is for what the test expects
        // done is needed for the test to move on after the current test is done
        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("check body", function (done) {
            request(url, function (error, response, body) {
                expect(body).to.equal(`[{"name":"nodejs","installed_version":"8.10.0","latest_version":"15.8.0"},{"name":"ruby","installed_version":"2.5.1","latest_version":"3.0.0"},{"name":"rails","installed_version":"5.0.7.2","latest_version":"6.1.2.1"},{"name":"mysql","installed_version":"5.7.32","latest_version":"8.0.23"},{"name":"ubuntu","installed_version":"18.04.5","latest_version":"20.10.0"},{"name":"sql_statement_test","installed_version":"7.2.17","latest_version":"7.2.13"}]`)
                done();
            });
        });
    });
    describe('Polarbears server', function () {
        var url = "http://localhost:8080/info/Polarbears";

        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("check body", function (done) {
            request(url, function (error, response, body) {
                expect(body).to.equal(`[{"name":"nodejs","installed_version":"10.23.1","latest_version":"15.8.0"},{"name":"postgresql","installed_version":"9.6.20","latest_version":"13.1.0"},{"name":"debian","installed_version":"9.13","latest_version":"10.8"},{"name":"mysql","installed_version":"7.2.13","latest_version":"8.0.23"},{"name":"sql_statement_test","installed_version":"7.2.13","latest_version":"7.2.13"}]`)
                done();
            });
        });
    });
    describe('Test POST request', function () {

        let software = {
            name: "java",
            latest_version: "15"
        }

        it('Expects status code 201', function (done) {
            chai.request(server)
                .post('/software')
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
                name: "java",
                latest_version: "11(LTS)"
            }
            chai.request(server)
                .put('/software/' + updateId)
                .send(software)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    console.log(updateId)
                    done();
                })
        })
    })
    describe('Test DELETE request', function () {

        it('Expects status 200', function (done) {
            chai.request(server)
                .delete('/software/' + updateId)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done()
                })
        })
    })
    describe('Test for GET eol dates', function () {

        it('Expects status code 200', function (done) {
            let softwareList = {
                "softwareList": [
                    { "name": "test", "version": "1.2.3" },
                    { "name": "test", "version": "3.2.1" }
                ]
            }
            chai.request(server)
                .get('/eolinfo/')
                .send(softwareList)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                })
        })
    })

    describe('Test POST eol dates', function () {

        it('Expects status code 200', function (done) {
            let softwareList = {
                "softwareList": [
                    {
                        "software_name": "testsoftware",
                        "version": "13.0.5",
                        "eol_date": "2021-07-1"
                    },
                    {
                        "software_name": "testos",
                        "version": "14.0.5",
                        "eol_date": "2021-07-1"
                    }
                ]

            }
            chai.request(server)
                .post('/eol')
                .send(softwareList)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(201);
                    done();
                })
        })
    })
});
