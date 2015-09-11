/*!
 * always-done <https://github.com/tunnckoCore/always-done>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var path = require('path')
var test = require('assertit')
var through2 = require('through2')
var merz = require('../index')

var exists = path.join(__dirname, '../.gitignore')
var notExists = path.join(__dirname, '../not_exists')

var EndStream = through2.ctor(function (chunk, enc, cb) {
  this.push(chunk)
  cb()
}, function (cb) {
  this.emit('end', 2)
  cb()
})

function success () {
  var read = fs.createReadStream(exists)
  return read.pipe(new EndStream())
}

function failure () {
  var read = fs.createReadStream(notExists)
  return read.pipe(new EndStream())
}

function unpiped () {
  return fs.createReadStream(exists)
}

test('should handle a successful stream', function (done) {
  merz(success)(function (err, res) {
    test.ifError(err)
    test.strictEqual(err, null)
    test.strictEqual(res, undefined)
    done()
  })
})

// works, but does nothing, IMHO
// it works even without `dezalgo` and `once` modulesin the core,
// so.. maybe good codebase?!?! Owned.
//
test('should handle a successful stream and call the callback once', function (done) {
  merz(function (cb) {
    return success().on('end', function () { cb(null, 3) })
  })(function (err, res) {
    test.ifError(err)
    test.strictEqual(err, null)
    test.strictEqual(res, 3)
    done()
  })
})

test('should handle an errored stream', function (done) {
  merz(failure)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should consume an unpiped readable stream', function (done) {
  merz(unpiped)(function (err, res) {
    test.ifError(err)
    test.strictEqual(err, null)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should accepts stream directly - success', function (done) {
  merz(fs.createReadStream('package.json'))(function (err, res) {
    test.ifError(err)
    test.equal(res, undefined)
    done()
  })
})

test('should accepts success stream directly', function (done) {
  merz(success())(function (err, res) {
    test.ifError(err)
    test.strictEqual(err, null)
    done()
  })
})

test('should accepts unpiped stream directly', function (done) {
  merz(unpiped())(function (err, res) {
    test.ifError(err)
    test.strictEqual(err, null)
    done()
  })
})

test('should accepts failing stream directly', function (done) {
  merz(fs.createReadStream('foobar.json'))(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.equal(err.code, 'ENOENT')
    test.equal(res, undefined)
    done()
  })
})
