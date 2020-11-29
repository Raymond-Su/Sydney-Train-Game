#!/usr/bin/env bash

CWD=$(pwd)
cd $CWD/server && npm install --only=dev && npm install
cd $CWD/client && npm install --only=dev && npm install && npm run build