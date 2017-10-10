#!/usr/bin/env bash

cd /app

bash scripts/wait-for-it.sh --timeout=60 exprboil-mongo-test:27017

apt-get -y update && apt-get -y install ocaml libelf-dev
curl -o- -L https://yarnpkg.com/install.sh | bash

yarn install
yarn run build
