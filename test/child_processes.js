/*!
 * always-done <https://github.com/tunnckoCore/always-done>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var cp = require('child_process')
var test = require('assertit')
var merz = require('../index')

function execSuccess () {
  return cp.exec('echo hello world')
}

function execFail () {
  return cp.exec('foo-bar-baz hello world')
}

function spawnSuccess () {
  return cp.spawn('echo', ['hello world'])
}

function spawnFail () {
  return cp.spawn('foo-bar-baz', ['hello world'])
}

test('should handle successful exec', function (done) {
  merz(execSuccess)(function (err, res) {
    test.ifError(err)
    test.strictEqual(err, null)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should handle failing exec', function (done) {
  merz(execFail)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should handle successful spawn', function (done) {
  merz(spawnSuccess)(function (err, res) {
    test.ifError(err)
    test.strictEqual(err, null)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should handle failing spawn', function (done) {
  merz(spawnFail)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should accepts successful spawn directly', function (done) {
  merz(cp.spawn('echo', ['hello']))(function (err, res) {
    test.ifError(err)
    test.equal(res, undefined)
    done()
  })
})

test('should accepts failing spawn directly', function (done) {
  merz(cp.spawn('fdsfsd_not_exist', ['hello']))(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.equal(err.code, 'ENOENT')
    test.equal(res, undefined)
    done()
  })
})

test('should accepts successful exec directly', function (done) {
  merz(cp.exec('echo hello'))(function (err, res) {
    test.ifError(err)
    test.equal(res, undefined)
    done()
  })
})

test('should accepts failing exec directly', function (done) {
  merz(cp.exec('fdsfsd_not_exist hello'))(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.equal(err.message, 'exited with error code: 127')
    test.equal(err.exitCode, 127)
    test.equal(res, undefined)
    done()
  })
})
