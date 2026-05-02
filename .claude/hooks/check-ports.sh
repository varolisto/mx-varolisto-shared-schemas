#!/usr/bin/env bash
# Bloquea cualquier proceso que vincule 3000 / 4000.
# Sin excepciones: este paquete no levanta servidores; todo proceso aux debe usar >= 5000.

set -u

input="$(cat)"
cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null || true)"

if [ -z "$cmd" ]; then
  exit 0
fi

if printf '%s' "$cmd" | grep -Eq '(--port|--ui-port|-p|--api\.port)[[:space:]=]?(3000|4000)\b|(\b|@)(localhost|127\.0\.0\.1|0\.0\.0\.0)?:(3000|4000)\b|--listen[[:space:]=]?(3000|4000)\b|http\.server[[:space:]]+(3000|4000)\b|-l[[:space:]]+(3000|4000)\b'; then
  echo "BLOQUEADO: el comando intenta vincular un puerto reservado (3000/4000)." >&2
  echo "Regla VaroListo: 3000 = frontend Next.js, 4000 = backend Fastify." >&2
  echo "Este paquete (@varolisto/shared-schemas) no necesita servidores; usa >= 5000 si arrancas algo auxiliar." >&2
  echo "Comando recibido: $cmd" >&2
  exit 2
fi

exit 0
