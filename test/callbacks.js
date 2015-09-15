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

function successJsonParse (callback) {
  callback(null, JSON.parse('{"foo":"bar"}'))
}

function notSpreadArrays (callback) {
  callback(null, [1, 2], 3, [4, 5])
}

function readFile (cb) {
  fs.readFile('package.json', 'utf8', cb)
}

function twoArgs (callback) {
  callback(null, 1, 2)
}

function failure (callback) {
  callback(new Error('callback error'))
}

test('should handle a successful callback', function (done) {
  merz(successJsonParse)(function (err, res) {
    test.ifError(err)
    test.deepEqual(res, {foo: 'bar'})
    done()
  })
})

test('should handle an errored callback', function (done) {
  merz(failure)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(err.message, 'callback error')
    test.strictEqual(res, undefined)
    done()
  })
})

test('should spread arguments - e.g. cb(null, 1, 2)', function (done) {
  merz(twoArgs)(function (err, one, two) {
    test.ifError(err)
    test.strictEqual(one, 1)
    test.strictEqual(two, 2)
    done()
  })
})

test('should not spread arrays - e.g. cb(null, [1, 2], 3)', function (done) {
  merz(notSpreadArrays)(function (err, arrOne, three, arrTwo) {
    test.ifError(err)
    test.deepEqual(arrOne, [1, 2])
    test.strictEqual(three, 3)
    test.deepEqual(arrTwo, [4, 5])
    done()
  })
})

test('should handle result of `fs.readFile`', function (done) {
  merz(readFile)(function (err, res) {
    test.ifError(err)
    test.equal(typeof res, 'string')
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    done()
  })
})

test('should accepts async function directly - fs.readFile - success', function (done) {
  merz(fs.readFile)('package.json', 'utf8', function (err, res) {
    test.ifError(err)
    test.equal(typeof res, 'string')
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    done()
  })
})
