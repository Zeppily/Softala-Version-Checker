var server = require('../App');
var expect = require('chai').expect;
var request = require("request");
var chai = require('chai');
var chaiHttp = require("chai-http");


chai.use(chaiHttp);

var updateId;

describe('Get data from DB', function () {
    describe('Raahe server', function () {
        var url = "http://localhost:8080/info/Raahe";

        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("check body", function (done) {
            request(url, function (error, response, body) {
                expect(body).to.equal(`[{"name":"nodejs","installed_version":"8.10.0","latest_version":"15.8.0"},{"name":"ruby","installed_version":"2.5.1","latest_version":"3.0.0"},{"name":"rails","installed_version":"5.0.7.2","latest_version":"6.1.2.1"},{"name":"mysql","installed_version":"5.7.32","latest_version":"8.0.23"},{"name":"ubuntu","installed_version":"18.04.5","latest_version":"20.10.0"}]`)
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
                expect(body).to.equal(`[{"name":"nodejs","installed_version":"10.23.1","latest_version":"15.8.0"},{"name":"postgresql","installed_version":"9.6.20","latest_version":"13.1.0"},{"name":"mysql","installed_version":"7.2.13","latest_version":"8.0.23"},{"name":"debian","installed_version":"9.13","latest_version":"10.8"}]`)
                done();
            });
        });
    });
    describe('Test post request', function () {

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
});
