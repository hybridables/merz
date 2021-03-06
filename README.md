
<p align="center" style="padding: 0; margin: 0;">
  <img src="./merz.png">
</p>
<p align="center">
  <a href="https://codeclimate.com/github/tunnckoCore/merz">
    <img src="https://img.shields.io/codeclimate/github/tunnckoCore/merz.svg">
  </a>
  <a href="https://github.com/feross/standard">
  <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg">
  </a>
  <a href="https://travis-ci.org/tunnckoCore/merz">
    <img src="https://img.shields.io/travis/tunnckoCore/merz.svg">
  </a>
  <a href="https://coveralls.io/r/tunnckoCore/merz">
    <img src="https://img.shields.io/coveralls/tunnckoCore/merz.svg">
  </a>
  <a href="https://david-dm.org/tunnckoCore/merz">
    <img src="https://img.shields.io/david/tunnckoCore/merz.svg">
  </a>
</p>


# [merz][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Wrapper to handle completion and errors of sync and async functions, promises, generators, streams, observables and child processes.


## Install
```
npm i merz --save
```


## Usage
> For more use-cases see the [tests](./test.js)

```js
var fs = require('fs')
var merz = require('merz')

var readFile = merz(fs.readFile)

fn('package.json', 'utf8', console.log)
```


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/merz/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/merz
[npmjs-img]: https://img.shields.io/npm/v/merz.svg?label=merz

[license-url]: https://github.com/tunnckoCore/merz/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/merz
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/merz.svg

[travis-url]: https://travis-ci.org/tunnckoCore/merz
[travis-img]: https://img.shields.io/travis/tunnckoCore/merz.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/merz
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/merz.svg

[david-url]: https://david-dm.org/tunnckoCore/merz
[david-img]: https://img.shields.io/david/tunnckoCore/merz.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg