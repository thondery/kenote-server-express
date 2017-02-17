# kenote-server-express
Kenote Server Express


[![Build Status][travis-image]][travis-url]
[![Codecov Status][codecov-image]][codecov-url]
[![dependencies Status][dependencies-image]][dependencies-url]
[![node version][node-image]][node-url]
[![npm version][npm-image]][npm-url]
[![Gratipay][licensed-image]][licensed-url]

[travis-image]: https://travis-ci.org/thondery/kenote-server-express.svg?branch=master
[travis-url]: https://travis-ci.org/thondery/kenote-server-express
[codecov-image]: https://img.shields.io/codecov/c/github/thondery/kenote-server-express/master.svg
[codecov-url]:   https://codecov.io/github/thondery/kenote-server-express?branch=master
[dependencies-image]: https://david-dm.org/thondery/kenote-server-express/status.svg
[dependencies-url]: https://david-dm.org/thondery/kenote-server-express
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.9-green.svg
[node-url]: http://nodejs.org/download/
[npm-image]: https://img.shields.io/badge/npm-%3E=_3.10-green.svg
[npm-url]: https://www.npmjs.com/package/npm
[licensed-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licensed-url]: https://github.com/thondery/kenote-server-express/blob/master/LICENSE

## Premise

- Node.js >= 6.9
- npm >= 3.10
- babel-cli >= 6.x
- pm2
- MongoDB

## Install

```
1. git clone https://github.com/thondery/kenote-server-express.git
2. npm install
```

## Usage

development

```
npm run dev
```

production

```
npm run start
npm run stop
npm run restart
npm run remove
```

## Test

test

```
npm test
```

coverage

```
npm run report-coverage
```

## Module

- [babel] for ES6 / 7
- [bluebird] for Promise
- [express] for Web Server
- [lodash] for JavaScript Tools
- [log4js] for Log
- [mocha] for Test
- [mongoose] for MongoDB ODM
- [swig] for HTML Template
- [validator] for Data Verification

[babel]: https://github.com/babel/babel/tree/master/packages/babel-core
[bluebird]: https://github.com/petkaantonov/bluebird
[express]: https://github.com/expressjs/express
[lodash]: https://github.com/lodash/lodash
[log4js]: https://github.com/nomiddlename/log4js-node
[mocha]: https://github.com/mochajs/mocha
[mongoose]: https://github.com/Automattic/mongoose
[swig]:https://github.com/paularmstrong/swig
[validator]: https://github.com/chriso/validator.js

## License

this repo is released under the [MIT License](https://github.com/thondery/kenote-server-express/blob/master/LICENSE).