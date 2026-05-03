---
"@varolisto/shared-schemas": minor
---

Setup de TDD y formalización de arquitectura limpia (sin breaking changes).

- Vitest + `@vitest/coverage-v8` con thresholds: ≥90% en `validators/` y `form/paso*.ts`, ≥70% global.
- 185 tests de caracterización (golden tests) cubriendo validators, helpers, form, api, domain y admin.
- Reglas de capas formalizadas con `dependency-cruiser` (`.dependency-cruiser.cjs`): `domain` ↛ `form`/`api`/`admin`, `form` ↛ `domain`/`api`/`admin`, `admin` ↛ `form`/`api`, etc.
- Nuevos scripts: `test`, `test:watch`, `test:coverage`, `depcheck`, `verify`.
- CI: nuevo `.github/workflows/test.yml` corre `verify` en PRs y push a `main`. `release.yml` ahora corre `verify` antes de publicar.
- `TESTING.md` documenta disciplina TDD, plantillas y thresholds. Plantilla de PR (`.github/pull_request_template.md`) con checklist.
- `tsconfig.build.json` excluye `src/__fixtures__/**` para no empaquetarlos.

Sin cambios en la API pública: los entry points (`.`, `/form`, `/validators`, `/enums`, `/domain`, `/api`, `/admin`) y los símbolos exportados son idénticos. Los consumidores (`api-backend`, `website-frontend`) no requieren cambios de imports.

**Gap detectado y documentado** (no resuelto, requiere decisión separada): `paso5Schema` exporta `MAX_FILE_SIZE_BYTES` pero no lo enforza en el schema. Hay un golden test que documenta el comportamiento actual.
