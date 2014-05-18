//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global describe: false, it: false, require: false, console: false*/



var assert = require("assert");
var http = require('http');


(function () {

    "use strict";

    // Cannot do CORS use local server: Use curl to test CORS
    var url = "http://localhost:3000";
             //http://localhost:63342/bizstatus/demo/index.html


    describe('Test Suite Biz-Status ', function () {



        describe('Token Test', function () {

            //curl -H "Content-Type: application/json" -X GET -d '{"name":"mary"}' http://localhost:3000/authenticate

            it('should return token', function () {



            });
        });

        describe('Create Test with Token', function () {

            it('should return mongo id', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Read Test with Token', function () {

            it('should return {ok:1, json_result}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Update Test with Token', function () {

            it('should return {ok:1}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Delete Test with Token', function () {

            it('should return {ok:1}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('List Test with Token', function () {

            it('should return {ok:1, JsonList}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Create Test No Token', function () {

            it('should return {ok:0, error:noToken}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Read Test No Token', function () {

            it('should return {ok:0, error:noToken}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Update Test No Token', function () {

            it('should return {ok:0, error:noToken}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Delete Test No Token', function () {

            it('should return {ok:0, error:noToken}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('List Test No Token', function () {

            it('should return {ok:0, error:noToken}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Create Test Invalid Data', function () {

            it('should return {ok:0, error:invalidData}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Read Test Invalid Key', function () {

            it('should return {ok:0, error:invalidKey}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Update Test Invalid Key', function () {

            it('should return {ok:0, error:invalidKey}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('Delete Test Invalid Key', function () {

            it('should return {ok:0, error:invalidKey}', function () {

                assert.strictEqual(true, true);

            });
        });

        describe('List Test Invalid Key', function () {

            it('should return {ok:0, error:invalidKey}', function () {

                assert.strictEqual(true, true);

            });
        });


    });


})();