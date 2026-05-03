# Testing en @varolisto/shared-schemas

## Herramientas

- **Vitest** — runner y assertions
- **@vitest/coverage-v8** — cobertura
- **dependency-cruiser** — validación de reglas de capa

## Comandos

| Comando | Descripción |
|---|---|
| `pnpm test` | Corre todos los tests |
| `pnpm test:watch` | Modo watch |
| `pnpm test:coverage` | Tests + reporte de cobertura |
| `pnpm depcheck` | Valida reglas de capas |
| `pnpm verify` | Pipeline completo: typecheck + lint + depcheck + test:coverage + build |

## Thresholds de cobertura

| Archivos | Statements | Branches | Functions | Lines |
|---|---|---|---|---|
| Global | 70% | 70% | 70% | 70% |
| `src/validators/**` | 90% | 90% | 90% | 90% |
| `src/form/paso*.ts` | 90% | 85% | 90% | 90% |

## Convenciones

### Ubicación de tests

- Tests **co-localizados**: `paso1.test.ts` vive junto a `paso1.ts`.
- Fixtures **centralizados**: `src/__fixtures__/` porque se comparten entre múltiples tests.
- Los fixtures **no se publican** al paquete (excluidos de `tsconfig.build.json`).

### Imports explícitos de Vitest

```ts
import { describe, expect, it } from 'vitest'
```

No usar globals; importar siempre de `vitest`.

### Naming

```ts
describe('validateClabe', () => {
  it('acepta CLABE con dígito de control correcto', () => { ... })
  it('rechaza CLABE de 17 dígitos', () => { ... })
})
```

- `describe` → nombre de la función o schema
- `it` → describe el comportamiento desde el punto de vista del usuario

## Regla TDD: qué necesita test

| Situación | ¿Test requerido? |
|---|---|
| Nueva función pura en `validators/` | Sí |
| Nuevo `.refine()` en cualquier schema | Sí |
| Nuevo schema en `form/`, `api/` o `admin/` | Sí (al menos un caso válido + un inválido por cada refine) |
| Cambio en enum `as const` (solo valor) | No |
| Cambio en barrel `index.ts` | No |

El test debe llegar en el **mismo PR** que el código. No se acepta código sin cobertura en `validators/` ni en `form/paso*.ts`.

## Workflow test-first

```
1. Escribir el test que falla (rojo)
2. Implementar lo mínimo para que pase (verde)
3. Cubrir edge cases y refactorizar
```

Para modificaciones a código existente: agregar el test del caso nuevo **antes** de tocar el schema.

## Templates

### Validador puro

```ts
import { describe, expect, it } from 'vitest'
import { validateX, isValidX } from './x.js'

describe('validateX', () => {
  it('acepta valor válido', () => {
    expect(validateX('valor-valido')).toEqual({ valid: true })
  })

  it('rechaza valor inválido', () => {
    expect(validateX('invalido')).toEqual({ valid: false, reason: 'formato_invalido' })
  })
})

describe('isValidX', () => {
  it('retorna true para valor válido', () => {
    expect(isValidX('valor-valido')).toBe(true)
  })
})
```

### Schema Zod

```ts
import { describe, expect, it } from 'vitest'
import { miSchema } from './mi-schema.js'

const base = { campo1: 'valor', campo2: 42 }

describe('miSchema', () => {
  it('acepta datos válidos', () => {
    expect(miSchema.safeParse(base).success).toBe(true)
  })

  it('rechaza campo1 vacío', () => {
    const r = miSchema.safeParse({ ...base, campo1: '' })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues[0]?.message).toBe('Campo requerido')
    }
  })
})
```
