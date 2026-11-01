#!/usr/bin/env bash
# =============================================================
#  deploy.sh — unggah situs German Plus ke Webspace Strato
#
#  Penggunaan:
#    export STRATO_HOST=ftp.strato.de
#    export STRATO_USER=username_ftp
#    export STRATO_PASS=password-webspace
#    export STRATO_DIR=html          # document root domain (opsional)
#    ./deploy.sh
#
#  Butuh: lftp  (sudo apt install lftp  |  brew install lftp)
# =============================================================
set -euo pipefail

: "${STRATO_HOST:?Isi STRATO_HOST (mis. ftp.strato.de)}"
: "${STRATO_USER:?Isi STRATO_USER}"
: "${STRATO_PASS:?Isi STRATO_PASS}"
STRATO_DIR="${STRATO_DIR:-html}"
PORT="${STRATO_PORT:-21}"

cd "$(dirname "$0")"

echo "==> Mengunggah ke ${STRATO_HOST}:${PORT}/${STRATO_DIR} sebagai ${STRATO_USER}"

lftp -u "${STRATO_USER}","${STRATO_PASS}" "ftp://${STRATO_HOST}:${PORT}" <<LFTP
set cmd:fail-exit yes
set net:max-retries 2
set ftp:ssl-allow yes
set mirror:parallel-transfer-count 4
mirror -R --delete \
  --verbose \
  --exclude-glob ".git/*" \
  --exclude-glob ".gitignore" \
  --exclude-glob ".playwright-cli/*" \
  --exclude-glob "node_modules/*" \
  --exclude-glob "_Website*" \
  --exclude-glob "README.md" \
  --exclude-glob "deploy.sh" \
  ./ "/${STRATO_DIR}/"
bye
LFTP

echo "==> Selesai. Cek situs di browser Anda."
