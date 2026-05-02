#!/usr/bin/env bash
# PreToolUse: bloquea `gh pr create` si la branch actual no aporta ningún
# archivo nuevo en `.changeset/` respecto a la branch base.
# Razón: cada PR debe traer su changeset para que release.yml pueda bumpear y
# publicar el paquete. Sin changeset, el merge a main no dispara release.

set -u

input="$(cat)"
cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null || true)"

if [ -z "$cmd" ]; then
  exit 0
fi

# Solo intercepta `gh pr create`.
if ! printf '%s' "$cmd" | grep -Eq '(^|[[:space:]]|;|&&|\|\|)gh[[:space:]]+pr[[:space:]]+create(\b|[[:space:]]|$)'; then
  exit 0
fi

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [ -z "$repo_root" ]; then
  exit 0
fi
cd "$repo_root" || exit 0

# Determinar branch base. Por defecto: main. Respetar --base / -B si se pasa.
base="main"
if printf '%s' "$cmd" | grep -Eq -- '(--base|-B)[[:space:]=]'; then
  parsed="$(printf '%s' "$cmd" | grep -Eo -- '(--base|-B)[[:space:]=][^[:space:]]+' | head -1 | sed -E 's/^(--base|-B)[[:space:]=]//')"
  if [ -n "$parsed" ]; then
    base="$parsed"
  fi
fi

# Resolver una ref válida del base: prefiere origin/<base>, cae a <base> local.
base_ref=""
if git rev-parse --verify --quiet "origin/$base" >/dev/null; then
  base_ref="origin/$base"
elif git rev-parse --verify --quiet "$base" >/dev/null; then
  base_ref="$base"
else
  echo "AVISO: no encuentro la branch base ($base) ni en local ni en origin. No puedo verificar changeset; permito la PR." >&2
  exit 0
fi

# Diff de la branch contra el merge-base con la base.
new_changesets="$(git diff --name-only --diff-filter=A "$base_ref"...HEAD -- '.changeset/*.md' 2>/dev/null || true)"
# README.md de .changeset/ no cuenta.
new_changesets="$(printf '%s\n' "$new_changesets" | grep -v '^\.changeset/README\.md$' || true)"

if [ -z "$new_changesets" ]; then
  cat >&2 <<EOF
BLOQUEADO: la branch actual no agrega ningún archivo en \`.changeset/\` respecto a $base_ref.

Cada PR de @varolisto/shared-schemas debe incluir su changeset para que
release.yml pueda bumpear la versión y publicar a GitHub Packages.

Pasos:
  1. pnpm changeset                 # describe el bump (patch/minor/major)
  2. git add .changeset/*.md
  3. git commit -m "chore: add changeset"
  4. git push
  5. gh pr create ...               # ya no se bloquea

Si es genuinamente un PR que no afecta el paquete publicado (ej: solo CI/docs),
agrega un changeset vacío con \`pnpm changeset --empty\`.
EOF
  exit 2
fi

exit 0
