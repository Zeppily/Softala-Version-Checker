// THIS IS TO BE DELETED BEFORE MERGE

// var server = require('../App');
// var expect = require('chai').expect;
// var request = require("request");
// var chai = require('chai');
// var chaiHttp = require("chai-http");


// chai.use(chaiHttp);

// // variable to use id in tests
// var updateId;

// // describe what the test does
// describe('Get data from DB', function () {
//     describe('Raahe server', function () {
//         var url = "http://localhost:8080/info/Raahe";

//         // it is for what the test expects
//         // done is needed for the test to move on after the current test is done
//         it("returns status 200", function (done) {
//             request(url, function (error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             });
//         });
//         it("check body to contain nodejs", function (done) {
//             request(url, function (error, response, body) {
//                 expect(body).to.contain(`"name":"nodejs"`)
//                 done();
//             });
//         });
//     });
//     describe('Polarbears server', function () {
//         var url = "http://localhost:8080/info/Polarbears";

//         it("returns status 200", function (done) {
//             request(url, function (error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             });
//         });
//         it("check body to contain nodejs", function (done) {
//             request(url, function (error, response, body) {
//                 expect(body).to.contain(`"name":"nodejs"`)
//                 done();
//             });
//         });
//     });
//     describe('Test POST request', function () {

//         let software = {
//             name: "java",
//             latest_version: "15"
//         }

//         it('Expects status code 201', function (done) {
//             chai.request(server)
//                 .post('/software')
//                 .send(software)
//                 .end((err, res) => {
//                     expect(res.statusCode).to.equal(201)
//                     updateId = res.text
//                     done();
//                 });
//         });
//     });
//     describe('Test PUT request', function () {

//         it('Expects status code 200', function (done) {
//             let software = {
//                 name: "java",
//                 latest_version: "11(LTS)"
//             }
//             chai.request(server)
//                 .put('/software/' + updateId)
//                 .send(software)
//                 .end((err, res) => {
//                     expect(res.statusCode).to.equal(200);
//                     console.log(updateId);
//                     done();
//                 })
//         })
//     })
//     describe('Test DELETE request', function () {

//         it('Expects status 200', function (done) {
//             chai.request(server)
//                 .delete('/software/' + updateId)
//                 .end((err, res) => {
//                     expect(res.statusCode).to.equal(200);
//                     done()
//                 })
//         })
//     })
//     describe('Test for GET eol dates', function () {

//         it('Expects status code 200', function (done) {
//             let softwareList = {
//                 "softwareList": [
//                     { "name": "test", "version": "1.2.3" },
//                     { "name": "test", "version": "3.2.1" }
//                 ]
//             }
//             chai.request(server)
//                 .get('/eolinfo/')
//                 .send(softwareList)
//                 .end((err, res) => {
//                     expect(res.statusCode).to.equal(200);
//                     done();
//                 })
//         })
//     })

//     describe('Test POST eol dates', function () {

//         it('Expects status code 200', function (done) {
//             let softwareList = {
//                 "softwareList": [
//                     {
//                         "software_name": "testing",
//                         "version": "5.3",
//                         "eol_date": "2021-07-1"
//                     },
//                     {
//                         "software_name": "this",
//                         "version": "3.5",
//                         "eol_date": "2021-07-1"
//                     }
//                 ]

//             }
//             chai.request(server)
//                 .post('/eol')
//                 .send(softwareList)
//                 .end((err, res) => {
//                     expect(res.statusCode).to.equal(201);
//                     done();
//                 })
//         })
//     })
// });
