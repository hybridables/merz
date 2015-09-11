/*!
 * merz <https://github.com/tunnckoCore/merz>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var alwaysDone = require('always-done')
var isGenFunction = require('is-es6-generator-function')
var handleArguments = require('handle-arguments')
var isChildProcess = require('is-child-process')
var isPromise = require('is-promise')
var isStream = require('is-node-stream')

module.exports = function merz (val) {
  if (!isAllowed(val)) {
    throw new TypeError('merz: expect `val` to be promise, stream, child process or sync, async, generator function')
  }
  var self = this
  return function wrapper () {
    var argz = handleArguments(arguments)

    // generator function
    if (isGenFunction(val)) {
      return alwaysDone.apply(self, [function () {
        return require('co').apply(self, [val].concat(argz.args))
      }].concat(argz.args).concat(argz.callback))
    }

    if (isPromise(val) || isStream(val) || isChildProcess(val)) {
      return alwaysDone.apply(self, [function () {
        return val
      }].concat(argz.args).concat(argz.callback))
    }

    return alwaysDone.apply(self, [val].concat(argz.args).concat(argz.callback))
  }
}

function isAllowed (val) {
  if (isStream(val)) return true
  if (isPromise(val)) return true
  if (isGenFunction(val)) return true
  if (isChildProcess(val)) return true
  if (typeof val === 'function') return true
  return false
}
