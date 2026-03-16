#!/usr/bin/env bash
set -euo pipefail

echo "== OpenClaw Browser Bridge Setup =="

if ! command -v openclaw >/dev/null 2>&1; then
  echo "ERROR: openclaw CLI not found. Install OpenClaw first."
  exit 1
fi

echo "OpenClaw version:"
openclaw --version || true

echo
if openclaw update >/dev/null 2>&1; then
  echo "OpenClaw updated."
else
  echo "OpenClaw update skipped (continuing)."
fi

echo
echo "Resetting local trust state and restarting gateway..."
openclaw devices clear >/dev/null 2>&1 || true
openclaw gateway restart >/dev/null 2>&1 || openclaw gateway start >/dev/null 2>&1

echo
echo "Installing Chrome extension files..."
openclaw browser extension install >/dev/null 2>&1
EXT_PATH="$(openclaw browser extension path | tail -n 1)"

TOKEN="$(openclaw config get gateway.auth.token || true)"

echo
cat <<EOF
Next steps:
1) Open chrome://extensions
2) Enable Developer mode
3) Click 'Load unpacked' and select:
   $EXT_PATH
4) In extension settings use:
   Gateway URL: ws://127.0.0.1:18789
   Gateway token: $TOKEN
5) Attach the extension to your active tab
EOF

if command -v open >/dev/null 2>&1; then
  open "chrome://extensions" || true
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "chrome://extensions" || true
fi

echo
echo "Verifying connection..."
if openclaw browser --browser-profile chrome tabs; then
  echo
  echo "SUCCESS: Browser bridge is connected."
else
  echo
  echo "Bridge not ready yet. Attach extension to an active tab, then run:"
  echo "openclaw browser --browser-profile chrome tabs"
  exit 2
fi
