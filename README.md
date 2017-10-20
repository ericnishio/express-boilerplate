express-boilerplate
===================

[![Known Vulnerabilities](https://snyk.io/test/github/ericnishio/express-boilerplate/master/badge.svg)](https://snyk.io/test/github/ericnishio/express-boilerplate)
[![Build Status](https://img.shields.io/travis/ericnishio/express-boilerplate.svg)](https://travis-ci.org/ericnishio/express-boilerplate)

A modern [Express](https://expressjs.com) boilerplate for building RESTful APIs.

- [Babel](https://babeljs.io) (transpiles to Node 6)
- ES2017, async/await, spread syntax, etc.
- [Flow](https://flow.org)
- [ESLint](https://eslint.org)
- [JWT](https://jwt.io)-based authentication
- [Mongoose](http://mongoosejs.com)
- [Jest](https://facebook.github.io/jest/)
- [Winston](https://github.com/winstonjs/winston)

Requirements: [Node](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/en/docs/install), [Docker](https://www.docker.com)

## Install

```
yarn
cp .env.dev .env
```

## Start dev server

Run the tests once to start the database container.

```
yarn start
```

## Build for production

```
yarn build
```

## Run tests

```
./run-tests.sh
```

## License

[MIT](LICENSE.md)
