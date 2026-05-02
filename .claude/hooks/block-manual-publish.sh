#!/usr/bin/env bash
# Bloquea publicación o tagging manual del paquete.
# El flujo oficial es: `pnpm changeset` -> PR -> release.yml lo publica en CI.
# `pnpm release` (= build && changeset publish) está permitido como hotfix manual,
# por eso solo se bloquean `npm version`, `pnpm publish` directo, `npm publish`,
# y `git tag v*` (los tags de version los genera Changesets).

set -u

input="$(cat)"
cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null || true)"

if [ -z "$cmd" ]; then
  exit 0
fi

# `pnpm changeset publish` está OK (es lo que usa release.yml y el hotfix manual).
if printf '%s' "$cmd" | grep -Eq '(npm|pnpm|yarn)[[:space:]]+version\b|(^|[[:space:]])npm[[:space:]]+publish\b|(^|[[:space:]])pnpm[[:space:]]+publish\b|git[[:space:]]+tag[[:space:]]+v[0-9]'; then
  cat >&2 <<'EOF'
BLOQUEADO: este paquete se versiona y publica con Changesets, no a mano.

Flujo oficial:
  1. pnpm changeset           # crea archivo en .changeset/ y describe el bump
  2. commit + PR              # release.yml detecta el changeset
  3. merge a main             # CI abre PR "chore: release packages"
  4. merge ese PR             # CI publica a GitHub Packages

Hotfix manual (excepción): `pnpm release` (= build && changeset publish) con la
version ya bumpeada en package.json. Documenta el motivo en el commit.
EOF
  exit 2
fi

exit 0
