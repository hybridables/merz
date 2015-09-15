/*!
 * merz <https://github.com/tunnckoCore/merz>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var test = require('assertit')
var merz = require('../index')

function successJsonParse () {
  return JSON.parse('{"foo":"bar"}')
}

function returnFailingJsonParse () {
  return JSON.parse('{"f')
}

function noReturnFailJsonParse () {
  JSON.parse('{"f')
}

function returnArray () {
  return [4, 5, 6]
}

function successReadFile () {
  return fs.readFileSync('package.json', 'utf-8')
}

function failReadFile () {
  return fs.readFileSync('foo-bar')
}

test('should handle result when JSON.parse pass', function (done) {
  merz(successJsonParse)(function (err, res) {
    test.ifError(err)
    test.deepEqual(res, {foo: 'bar'})
    done()
  })
})

test('should handle error when JSON.parse fail', function (done) {
  merz(returnFailingJsonParse)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should handle result when fs.readFileSync pass', function (done) {
  merz(successReadFile)(function (err, res) {
    test.ifError(err)
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    done()
  })
})

test('should handle error when fs.readFileSync fail', function (done) {
  merz(failReadFile)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should handle thrown errors', function (done) {
  merz(noReturnFailJsonParse)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should pass whole returned array to single argument', function (done) {
  merz(returnArray)(function (err, arr) {
    test.ifError(err)
    test.deepEqual(arr, [4, 5, 6])
    done()
  })
})

test('should accepts sync function directly - fs.readFileSync fail', function (done) {
  merz(fs.readFileSync)('foo bar.json', function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.equal(err.code, 'ENOENT')
    test.strictEqual(res, undefined)
    done()
  })
})
