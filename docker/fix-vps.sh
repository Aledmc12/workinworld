#!/usr/bin/env bash
# Recuperación workinworld.zomidev.com en VPS — ejecutar como root
set -euo pipefail

echo "==> 1. Nginx: volúmenes wingconcept + red docker_wingnet"
cd /opt/wingconcept/docker
docker stop wingconcept_nginx wingconcept_certbot 2>/dev/null || true
docker rm wingconcept_nginx wingconcept_certbot 2>/dev/null || true
docker compose -p wingconcept up -d --no-deps nginx certbot
docker network connect docker_wingnet wingconcept_nginx 2>/dev/null || true

echo "==> 2. Work in World: HOSTNAME=0.0.0.0"
WIW=/opt/workinworld/workinworld/docker
if ! grep -q 'HOSTNAME=0.0.0.0' "$WIW/docker-compose.yml" 2>/dev/null; then
  sed -i '/env_file:/i\    environment:\n      - HOSTNAME=0.0.0.0' "$WIW/docker-compose.yml"
  sed -i 's|http://localhost:3000/|http://127.0.0.1:3000/|' "$WIW/docker-compose.yml"
fi
grep -q 'workinworld.zomidev.com' "$WIW/.env" || echo 'NEXT_PUBLIC_SITE_URL=https://workinworld.zomidev.com' >> "$WIW/.env"
sed -i 's|NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=https://workinworld.zomidev.com|' "$WIW/.env"

echo "==> 3. Rebuild app"
cd "$WIW"
./deploy.sh

echo "==> 4. Verificar"
docker exec wingconcept_nginx nginx -t
docker exec wingconcept_nginx nginx -s reload
curl -sI http://172.17.0.1:8082/ | head -3
curl -sI -H 'Host: workinworld.zomidev.com' https://127.0.0.1/ | head -3
echo "Listo: https://workinworld.zomidev.com"
