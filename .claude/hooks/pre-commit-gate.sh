#!/usr/bin/env bash
# Antes de `git commit`: solo `pnpm typecheck` (no hay tests ni linter en este repo).

set -u

input="$(cat)"
cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null || true)"

if [ -z "$cmd" ]; then
  exit 0
fi

if ! printf '%s' "$cmd" | grep -Eq '(^|[[:space:]]|;|&&|\|\|)git[[:space:]]+commit([[:space:]]|$)'; then
  exit 0
fi

if printf '%s' "$cmd" | grep -Eq '(^|[[:space:]])--no-verify([[:space:]]|$)'; then
  exit 0
fi

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || echo .)"
cd "$repo_root" || exit 0

echo "[pre-commit] pnpm typecheck..." >&2
if ! pnpm -s typecheck >&2; then
  echo "BLOQUEADO: typecheck fallo. Arregla los errores de TS antes de commitear." >&2
  exit 2
fi

echo "[pre-commit] OK." >&2
exit 0
