#!/usr/bin/env bash
# PostToolUse: tras editar src/**/*.ts (no *.test.ts), recordar `pnpm changeset`
# si no hay un .changeset/*.md nuevo desde el último commit. No bloquea.

set -u

input="$(cat)"
path="$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty' 2>/dev/null || true)"

if [ -z "$path" ]; then
  exit 0
fi

case "$path" in
  *src/*.ts|*src/**/*.ts) : ;;
  *) exit 0 ;;
esac

# Excluir archivos de test (no aplica acá hoy, pero está en la convención).
case "$path" in
  *.test.ts) exit 0 ;;
esac

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [ -z "$repo_root" ]; then
  exit 0
fi

# ¿Hay archivos nuevos en .changeset/ versus el HEAD?
new_changesets="$(git -C "$repo_root" status --porcelain -- '.changeset/' 2>/dev/null | grep -E '^\?\?|^A ' | grep -E '\.changeset/[^/]+\.md$' || true)"

if [ -z "$new_changesets" ]; then
  msg="Cambio en src/ detectado sin un nuevo archivo en .changeset/. Recordatorio: corre \`pnpm changeset\` antes del PR para que release.yml pueda bumpear y publicar el paquete."
  printf '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"%s"}}\n' "$msg"
fi

exit 0
