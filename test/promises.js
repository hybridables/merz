/*!
 * always-done <https://github.com/tunnckoCore/always-done>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('mz/fs')
var test = require('assertit')
var Bluebird = require('bluebird')
var merz = require('../index')

function resolvedPromise () {
  return Bluebird.resolve(123)
}

function rejectedPromise () {
  return Bluebird.reject(new Error('promise error'))
}

function successReadFile () {
  return fs.readFile('package.json', 'utf-8')
}

function failReadFile () {
  return fs.readFile('foo-bar')
}

test('should handle a resolved promise', function (done) {
  merz(resolvedPromise)(function (err, res) {
    test.ifError(err)
    test.strictEqual(res, 123)
    done(err)
  })
})

test('should handle a rejected promise', function (done) {
  merz(rejectedPromise)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should handle result of promised fs.readFile', function (done) {
  merz(successReadFile)(function (err, res) {
    test.ifError(err)
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    done()
  })
})

test('should handle error of promised fs.readFile', function (done) {
  merz(failReadFile)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should accepts resolved promise directly', function (done) {
  merz(Bluebird.resolve(456))(function (err, res) {
    test.ifError(err)
    test.equal(res, 456)
    done()
  })
})

test('should accepts rejected promise directly', function (done) {
  merz(Bluebird.reject(new Error('error promise')))(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.equal(err.message, 'error promise')
    test.equal(res, undefined)
    done()
  })
})
