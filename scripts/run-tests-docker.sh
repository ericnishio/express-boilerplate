#!/usr/bin/env bash

cd /app

bash scripts/wait-for-it.sh --timeout=60 exprboil-mongo-test:27017

yarn install

yarn lint

node scripts/dropTestDb.js

yarn test
