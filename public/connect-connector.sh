#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/florianthompson/clerk-connector.git}"
INSTALL_DIR="${INSTALL_DIR:-$HOME/clerk-connector}"
CONTROL_PLANE_URL="${CONTROL_PLANE_URL:-https://clerk-landing.vercel.app}"
CONNECTOR_ID="${CONNECTOR_ID:-$(hostname | tr '[:upper:]' '[:lower:]')-connector}"
CONNECTOR_TOKEN="${CONNECTOR_TOKEN:-}"

echo "== Clerk Connector Setup =="

if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: git is required"
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: node is required"
  exit 1
fi

if [ -d "$INSTALL_DIR/.git" ]; then
  echo "Updating existing connector at $INSTALL_DIR"
  git -C "$INSTALL_DIR" fetch --all --prune
  git -C "$INSTALL_DIR" reset --hard origin/master
else
  echo "Cloning connector to $INSTALL_DIR"
  git clone "$REPO_URL" "$INSTALL_DIR"
fi

cd "$INSTALL_DIR"

if [ -z "${CONNECTOR_TOKEN}" ]; then
  echo
  read -r -p "Enter CONNECTOR_SHARED_TOKEN (same value used on Clerk backend): " CONNECTOR_TOKEN
fi

if [ -z "${CONNECTOR_TOKEN}" ]; then
  echo "ERROR: CONNECTOR_TOKEN is required"
  exit 1
fi

cat > .env <<EOF
CONNECTOR_ID=$CONNECTOR_ID
CONNECTOR_TOKEN=$CONNECTOR_TOKEN
CONTROL_PLANE_URL=$CONTROL_PLANE_URL
POLL_INTERVAL_MS=4000
EOF

echo "Wrote .env with:"
echo "  CONNECTOR_ID=$CONNECTOR_ID"
echo "  CONTROL_PLANE_URL=$CONTROL_PLANE_URL"

npm install

echo

echo "Starting connector..."
echo "(Keep this terminal open)"

npm start
