//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global describe: false, it: false, require: false, console: false, before: false, after: false*/


var config = require('../config.json');
var connect = require('../db/connect');
var mongoose = require('../db/action');
var assert = require("assert");
var http = require('http');
var request = require('request');
var validate = require('validator');
var Log = require('log');
var log = new Log(config.logLevel);
log.info('test.js - Logger Set');


(function () {

    "use strict";

    var url = "http://localhost:" + config.nodePort;

    function Options() {

        return {
            url: "setURLHere",
            method: "setMethodHere",
            headers: {
                'Content-Type': 'application/json'
            },
            body: "setBodyHere"
        };
    }

    var token = null;

    // Dummy Data
    var createMock = {

        org: 'test_org',
        div: 'test_div',
        unit: 'test_unit',
        user: 'mary_test_mocha',
        isPerson: true,
        assignmentType: 'Test Assignment Type',
        status: 'Test Status',
        statusInfo: 'Test Status Info ',
        priority: 10,   // 0 - 100
        createDate: Date.now(),
        completionDate: Date.now(),
        goalDate: Date.now(),
        deadlineDate: Date.now(),
        header: 'Test Header',
        detail: 'Test Detail',
        deeplink: 'http://www.bizrez.com'

    };

    // Get token once - use on all subsequent calls
    function getToken(done) {

        var options = new Options();
        options.url = url + "/authenticate";
        options.method = "POST";
        options.body = JSON.stringify({"ownerId": "mary"});

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var result = JSON.parse(body);
                assert.strictEqual((result.token !== ""), true);
                token = result;
                done();
            } else {
                assert.strictEqual(true, false);
                done();
            }
        });
    }

    // Begin Test Suite
    describe('Asynchronous Test Suite Biz-Status ', function () {

        // Set up the Token
        before(function (done) {
            log.debug("Testing REST services using HTTP Calls");
            getToken(done);
            log.debug('Token:' + token);
        });

        // Clean up
        after(function (done) {
            console.log('hack to get log.info written to buffer');
            log.debug('after - cleaning up');
            mongoose.purge({ownerId: 'mary_test_mocha'});
            done();
        });

        describe('Token Test', function (done) {

        //curl -H "Content-Type: application/json" -X POST -d '{"ownerId":"mary"}' http://localhost:3000/authenticate

            it('should return token', function (done) {
                console.dir(token);
                log.debug('token test:' + token.token);
                assert.strictEqual((token !== null), true);
                done();
            });
        });

        describe('Create Test with Token', function (done) {

        //curl -H "Content-Type: application/json" -X POST -d '{add token and data}' http://localhost:3000/status/create

            it('should return mongo id', function (done) {

                var options = new Options();
                options.url = url + "/status/create";
                options.method = "POST";

                createMock.token = token.token;
                options.body = JSON.stringify(createMock);

                request(options, function (error, response, body) {

                    if (!error && response.statusCode === 200) {
                        var result = JSON.parse(body);
                        assert.strictEqual((result.ok === 1), true);
                        //token = result;
                        done();
                    } else {
                        assert.strictEqual(true, false);
                        done();
                    }
                });

            });
        });

        describe('Read Test with Token', function (done) {

        //curl -H "Content-Type: application/json" -X POST -d '{add token and data}' http://localhost:3000/status/read

            it('should return {ok:1, json_result}', function (done) {

                var options = new Options();
                var body = {ownerId: "mary_test_mocha"};
                body.token = token.token;

                options.url = url + "/status/read";
                options.method = "POST";
                options.body = JSON.stringify(body);

                request(options, function (error, response, body) {

                    if (!error && response.statusCode === 200) {
                        var result = JSON.parse(body);
                        log.debug(body);
                        assert.strictEqual((result.ok === 1), true);
                        done();
                    } else {
                        log.debug(error);
                        assert.strictEqual(true, false);
                        done();
                    }
                });

            });
        });

        describe('Update Test with Token', function (done) {

        //curl -H "Content-Type: application/json" -X POST -d '{add token and data}' http://localhost:3000/status/update

            it('should return {ok:1}', function (done) {

                var options = new Options();
                var body = {ownerId: "mary_test_mocha"};
                body.token = token.token;
                body.query = {ownerId: "mary_test_mocha"};
                body.update = {'$set':{status:'Closed-Yahoo'}};

                options.url = url + "/status/update";
                options.method = "POST";
                options.body = JSON.stringify(body);

                request(options, function (error, response, body) {

                    if (!error && response.statusCode === 200) {
                        var result = JSON.parse(body);
                        log.debug(body);
                        assert.strictEqual((result.ok === 1), true);
                        done();
                    } else {
                        log.debug(error);
                        assert.strictEqual(true, false);
                        done();
                    }
                });

            });
        });

        describe('Paginate Test with Token', function (done) {

            it('should return {ok:1, JsonList}', function (done) {

                var options = new Options();
                var body = {};
                body.token = token.token;
                body.pageNumber = 1;

                options.url = url + "/status/paginate";
                options.method = "POST";
                options.body = JSON.stringify(body);

                request(options, function (error, response, body) {

                    log.debug("paginated");

                    if (!error && response.statusCode === 200) {
                        var result = JSON.parse(body);
                        console.log('');
                        log.debug("paginate result: " + body);
                        assert.strictEqual((result.ok === 1), true);
                        done();
                    } else {
                        log.debug(error);
                        assert.strictEqual(true, false);
                        done();
                    }

                });

            });
        });
    });

})();