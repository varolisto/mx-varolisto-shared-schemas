# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm build` — Compila ESM, CJS y tipos en `dist/` (ejecuta los tres `build:*` en secuencia)
- `pnpm typecheck` — Verifica tipos sin emitir archivos
- `pnpm clean` — Elimina `dist/`
- `pnpm test` — Corre la suite Vitest una vez
- `pnpm test:watch` — Vitest en modo watch
- `pnpm test:coverage` — Suite + reporte de cobertura (falla si baja del threshold)
- `pnpm depcheck` — Verifica reglas de capas con dependency-cruiser
- `pnpm verify` — `typecheck → depcheck → test:coverage → build`

## Testing

Vitest está configurado con tests co-localizados (`paso1.test.ts` junto a `paso1.ts`) y fixtures compartidos en `src/__fixtures__/`. Ver `TESTING.md` para la disciplina TDD, plantillas y thresholds.

## Reglas de capas

| Capa | Importa de |
|---|---|
| `enums/` | nada |
| `helpers.ts` | nada |
| `validators/` | nada |
| `domain/` | `enums`, `helpers` |
| `form/` | `validators`, `enums`, `helpers` |
| `api/` | `form`, `domain`, `enums`, `helpers` |
| `admin/` | `domain`, `validators`, `enums`, `helpers` |

Enforzadas por `dependency-cruiser` (`.dependency-cruiser.cjs`). `pnpm depcheck` falla si se viola.

## Publicación

El paquete se publica en **GitHub Packages** (`https://npm.pkg.github.com`) bajo el scope `@varolisto`.

La publicación es **automática via CI** al hacer push de un tag `v*` (ej. `git tag v0.2.0 && git push origin v0.2.0`). El workflow `.github/workflows/publish.yml` corre build, typecheck y `npm publish`.

Para instalar el paquete en otro repo, el consumidor necesita un `.npmrc` con:
```
@varolisto:registry=https://npm.pkg.github.com
```

## Arquitectura

### Módulos exportados

El paquete expone tres entry points (ver `exports` en `package.json`):

| Entry point | Contenido |
|---|---|
| `@varolisto/shared-schemas` | Re-exporta todo (schemas + clabe + helpers) |
| `@varolisto/shared-schemas/schemas` | Solo schemas Zod por paso |
| `@varolisto/shared-schemas/clabe` | Solo utilidades CLABE |

### Schemas (`src/schemas/`)

Cada archivo `pasoN.ts` define un `z.object()` (o con `.refine()`) correspondiente a un paso del formulario de solicitud de crédito. Todos exportan el schema y su tipo inferido `PasoNData`.

`src/schemas/index.ts` combina los 6 pasos en `solicitudSchema` (usando `.and()` encadenado) y exporta `SolicitudCompleta` como el tipo del formulario completo.

| Schema | Campos clave |
|---|---|
| `paso1Schema` | Datos personales: nombre, CURP, dirección, CP, colonia |
| `paso2Schema` | Condiciones del crédito: monto (2k–20k), plazo, destino |
| `paso3Schema` | Situación laboral e ingresos, deudas existentes |
| `paso4Schema` | Referencias personales |
| `paso5Schema` | CLABE interbancaria (validada) y comprobantes (2–5 archivos) |
| `paso6Schema` | Confirmación / revisión final |

### CLABE (`src/clabe/`)

`validator.ts` implementa:
- `validateClabe(clabe)` — validación del dígito de control según el algoritmo oficial Banxico
- `getBancoFromClabe(clabe)` — lookup del nombre del banco a partir de los primeros 3 dígitos

`paso5Schema` usa `validateClabe` directamente en un `.refine()`.

### Helper (`src/helpers.ts`)

`zStr(msg?)` — shorthand para `z.string().min(1, msg)` usado en todos los schemas para campos de texto requeridos.

## Build

El build dual (ESM + CJS) se genera con `tsc` dos veces usando flags diferentes. `tsconfig.build.json` extiende `tsconfig.json` y excluye tests. Los tipos se emiten por separado con `--emitDeclarationOnly`.
