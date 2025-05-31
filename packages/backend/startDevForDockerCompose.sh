#!/bin/bash

# Check if node_modules directory exists
if ! ls "node_modules" >/dev/null 2>&1; then
  echo "node_modules not found. Running npm ci..."
  npm ci --no-audit --no-fund
else
  if ! ls node_modules/@rollup/rollup-linux* >/dev/null 2>&1; then
    echo "Warning! rollup does not seem to be installed correctly for docker, so we are reinstalling node_modules!"
    npm ci --no-audit --no-fund
  fi
  echo "node_modules already exists. Skipping npm ci."
fi

npm run dev
