express-boilerplate
===================

[![Known Vulnerabilities](https://snyk.io/test/github/ericnishio/express-boilerplate/master/badge.svg)](https://snyk.io/test/github/ericnishio/express-boilerplate)
[![Build Status](https://img.shields.io/travis/ericnishio/express-boilerplate.svg)](https://travis-ci.org/ericnishio/express-boilerplate)

A modern Express boilerplate for building RESTful APIs.

- Babel (transpiles to Node 6)
- ES2017, async/await, etc.
- Flow
- ESLint
- JWT-based authentication
- Mongoose
- Jest
- Winston

## Install

```
yarn
cp .env.dev .env
```

## Start dev server

(Run the tests to lift up the database container.)

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
