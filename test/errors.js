/*!
 * merz <https://github.com/tunnckoCore/merz>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

'use strict'

var test = require('assertit')
var merz = require('../index')

function failureOne () {
  merz(123)
}

function failureTwo () {
  merz({foo: 'bar'})
}

function returnError () {
  return new Error('foo bar')
}

test('should throw TypeError if not promise, stream or child process', function (done) {
  test.throws(failureOne, TypeError)
  test.throws(failureOne, /expect `val` to be promise, stream, child process/)
  done()
})

test('should throw TypeError if not sync, async or generator function', function (done) {
  test.throws(failureTwo, TypeError)
  test.throws(failureTwo, /expect .* or sync, async, generator function/)
  done()
})

test('should returned error be passed to completion callback as `err`', function (done) {
  merz(returnError)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.equal(err.message, 'foo bar')
    test.equal(res, undefined)
    done()
  })
})
