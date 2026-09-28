#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
git pull origin production
cd docker
docker compose -p workinworld up -d --build
echo "Actualización completada"
