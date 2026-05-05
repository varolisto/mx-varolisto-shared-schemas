#!/usr/bin/env bash
# UserPromptSubmit: recordatorio compacto del workflow por cada mensaje.
set -u

branch="$(git branch --show-current 2>/dev/null || echo 'desconocida')"

reminder="[shared-schemas | rama: $branch] Checklist: (1) ¿En feature branch? (no main) (2) ¿Test fallando primero? → /test-driven-development (3) ¿Nueva fase? → espera confirmacion. PR va contra main. Changeset: pnpm changeset."

printf '%s' "$reminder" | jq -Rs '{"hookSpecificOutput":{"hookEventName":"UserPromptSubmit","additionalContext":.}}'
