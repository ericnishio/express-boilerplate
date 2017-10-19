#!/usr/bin/env sh

docker-compose run --rm app-test /bin/sh -c 'sh /app/scripts/run-tests-docker.sh'
