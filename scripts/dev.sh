#!/usr/bin/env bash

set -e

set -a
if [ -f .env ]; then
  source .env
fi
set +a

cleanup() {
  echo "Stopping services..."
  [ -n "$AIR_PID" ] && kill $AIR_PID 2>/dev/null
  [ -n "$NEXT_PID" ] && kill $NEXT_PID 2>/dev/null
}

trap cleanup INT TERM EXIT

air &
AIR_PID=$!

npm --prefix frontend run watch &
NEXT_PID=$!

wait $AIR_PID $NEXT_PID
