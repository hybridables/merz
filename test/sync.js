/*!
 * always-done <https://github.com/tunnckoCore/always-done>
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

function failJsonParse () {
  return JSON.parse('{"f')
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
  merz(failJsonParse)(function (err, res) {
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
    test.equal(err.code, 'ENOENT')
    test.strictEqual(res, undefined)
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
