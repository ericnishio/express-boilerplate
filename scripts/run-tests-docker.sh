#!/usr/bin/env bash

cd /app

bash scripts/wait-for-it.sh --timeout=60 exprboil-mongo-test:27017

node scripts/dropTestDb.js

yarn install
yarn proofread
yarn test
