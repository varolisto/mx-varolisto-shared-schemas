# Testing

Este paquete usa **Vitest** para tests unitarios y **dependency-cruiser** para enforzar las reglas de capas.

## Comandos

| Comando | Qué hace |
|---|---|
| `pnpm test` | Corre toda la suite una vez |
| `pnpm test:watch` | Modo watch para desarrollo |
| `pnpm test:coverage` | Suite + reporte de cobertura (falla si baja del threshold) |
| `pnpm depcheck` | Verifica reglas de capas con dependency-cruiser |
| `pnpm verify` | `typecheck → depcheck → test:coverage → build` |

## Reglas de capas (arquitectura limpia formalizada)

```
Capa 0 (hojas):     enums/        helpers.ts
Capa 1 (puro):      validators/   ── (sin deps internas)
Capa 2 (entidades): domain/       ── enums, helpers
Capa 3 (wire-form): form/         ── validators, enums, helpers
Capa 4 (contratos): api/          ── form, domain, enums, helpers
Capa 5 (admin):     admin/        ── domain, validators, enums, helpers
```

| Capa | Importa de |
|---|---|
| `enums/` | nada |
| `helpers.ts` | nada |
| `validators/` | nada |
| `domain/` | `enums`, `helpers` |
| `form/` | `validators`, `enums`, `helpers` |
| `api/` | `form`, `domain`, `enums`, `helpers` |
| `admin/` | `domain`, `validators`, `enums`, `helpers` |

`pnpm depcheck` falla si se viola alguna regla. Las reglas viven en `.dependency-cruiser.cjs`.

## Disciplina TDD

> **Regla**: toda función pura nueva en `validators/`, todo `.refine()` nuevo y todo schema nuevo en `form`/`api`/`admin` debe llegar con su test en el mismo PR.

### Workflow test-first

1. Escribir test rojo con un caso inválido o esperado.
2. Correr `pnpm test:watch` y verificar que falla.
3. Implementar la función / refine.
4. Volver a verde.
5. Agregar casos válidos y edge cases (límites, formatos alternos, casos opcionales).

### Cuándo NO escribir test

- Cambios solo en `enums/` (arrays `as const` sin lógica).
- Cambios solo en archivos `index.ts` que reexportan.
- Renombres puros sin cambios de comportamiento (con `git mv`).

### Convenciones

- **Ubicación**: tests **co-localizados** con el código (`paso1.test.ts` junto a `paso1.ts`).
- **Naming**: `describe("nombreFuncionOSchema") → it("rechaza CLABE de longitud 17")`. Frase completa, en español, en presente, sin "should".
- **Imports de Vitest**: explícitos (`import { describe, it, expect } from "vitest"`) — no globals.
- **Fixtures compartidos**: en `src/__fixtures__/`. Cada fixture se nombra como constante `VALID_*` o `INVALID_*` y declara *en su nombre* qué representa.
- **Una aserción por intención**: prefer `expect(result.success).toBe(true)` sobre comparar objetos enteros, salvo en validators que retornan resultados ricos (`validateCurp`, `validateRfc`, `validateTelefonoMx`) — en esos sí compara la shape completa.

### Plantillas

**Validador puro** (`src/validators/algo.test.ts`):

```ts
import { describe, it, expect } from "vitest"
import { isValidAlgo, validateAlgo } from "./algo.js"
import { VALID_ALGO, INVALID_ALGO_X } from "../__fixtures__/algos.js"

describe("validateAlgo", () => {
  it("acepta un valor válido", () => {
    expect(validateAlgo(VALID_ALGO)).toEqual({ valid: true })
  })

  it("rechaza X con razón específica", () => {
    expect(validateAlgo(INVALID_ALGO_X)).toEqual({
      valid: false,
      reason: "razon_especifica",
    })
  })
})
```

**Schema Zod** (`src/form/pasoX.test.ts`):

```ts
import { describe, it, expect } from "vitest"
import { pasoXSchema } from "./pasoX.js"

const validPasoX = { /* fixture mínimo válido */ }

describe("pasoXSchema", () => {
  it("acepta un pasoX válido", () => {
    expect(pasoXSchema.safeParse(validPasoX).success).toBe(true)
  })

  it("rechaza cuando campo Y está fuera de rango", () => {
    expect(
      pasoXSchema.safeParse({ ...validPasoX, y: 0 }).success,
    ).toBe(false)
  })
})
```

## Cobertura

Thresholds configurados en `vitest.config.ts`:

| Path | Statements | Branches | Functions | Lines |
|---|---|---|---|---|
| Global | 70% | 70% | 70% | 70% |
| `src/validators/**` | 90% | 90% | 90% | 90% |
| `src/form/paso*.ts` | 90% | 85% | 90% | 90% |

Excluidos del cómputo: `src/**/index.ts`, `src/__fixtures__/**`, `src/enums/**` (arrays `as const` sin lógica).

CI falla si baja del threshold actual. Cuando se quiera subir el listón, hacerlo en un sprint dedicado, no a la deriva.

## CI

- `.github/workflows/test.yml` corre `verify` en cada PR y push a `main`.
- `.github/workflows/release.yml` corre `verify` antes de publicar — un release nunca sube código que no pasa tests.

## Gaps documentados (golden tests existentes)

- **`paso5Schema` no enforza `MAX_FILE_SIZE_BYTES`**: la constante está exportada pero el schema acepta archivos de cualquier tamaño. Hay un golden test en `paso5.test.ts` que documenta este comportamiento. Enforcearlo sería un cambio breaking que debe llegar en su propio changeset major (revisar fixtures del frontend antes).
- **`prestamoSchema` y `pagoSchema` son `z.object({})` placeholders**: los tests confirman que aceptan objeto vacío. Cuando se definan, ampliar los tests.
- **`generarCotizacion` request/response son `z.object({})` placeholders**: igual que arriba.
