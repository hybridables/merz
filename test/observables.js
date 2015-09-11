/*!
 * always-done <https://github.com/tunnckoCore/always-done>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var Observable = require('rx').Observable
var merz = require('../index')

function success () {
  return Observable.empty()
}

function successValue () {
  return Observable.return([1, 2, 3])
}

function failure () {
  return Observable.throw(new Error('observable error'))
}

test('should handle a finished empty observable', function (done) {
  merz(success)(function (err, res) {
    test.ifError(err)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should handle a finished observable with value', function (done) {
  merz(successValue)(function (err, res) {
    test.ifError(err)
    test.deepEqual(res, [1, 2, 3])
    done()
  })
})

test('should handle an errored observable', function (done) {
  merz(failure)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})
