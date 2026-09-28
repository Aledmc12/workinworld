#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
docker compose -p workinworld up -d --build
echo "Work in World desplegado en puerto 8082"
