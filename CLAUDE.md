# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Puertos reservados — no tocar

Los puertos **3000** y **4000** están reservados para los servicios principales del stack VaroListo:

- **3000** — Frontend Next.js (`mx-varolisto-website-frontend`)
- **4000** — Backend Fastify (`mx-varolisto-api-backend`)

Aunque este paquete no levanta servidores, si arrancas un proceso auxiliar (script de prueba, dev server temporal, MCP server) **usa siempre un puerto ≥ 5000**. Tocar 3000 o 4000 tumba los servicios del usuario y obliga a matar puertos a mano.

## Qué es este paquete

`@varolisto/shared-schemas` es la fuente de verdad de los **schemas Zod**, **enums de dominio** y **validadores** que comparten el frontend (`mx-varolisto-website-frontend`) y el backend (`mx-varolisto-api-backend`).

Se publica en **GitHub Packages** bajo el scope `@varolisto`. Los consumidores lo instalan con `.npmrc` apuntando a `https://npm.pkg.github.com`.

**Regla de oro**: cualquier shape de datos que viaje entre frontend y backend (request, response, formulario, payload de evento) **nace acá**. Nunca duplicar schemas en los repos consumidores — siempre importarlos de este paquete.

Los enums de este paquete son la **fuente de verdad** de los valores válidos del dominio. El `schema.prisma` del backend debe reflejarlos. Cuando agregues o modifiques un enum aquí, abre PR equivalente en el backend.

## Comandos

| Script | Descripción |
|---|---|
| `pnpm build` | Build dual: corre `build:esm`, `build:cjs` y `build:types` en secuencia |
| `pnpm build:esm` | `tsc --module NodeNext --outDir dist/esm` |
| `pnpm build:cjs` | `tsc --module CommonJS --moduleResolution node --outDir dist/cjs` |
| `pnpm build:types` | `tsc --declaration --emitDeclarationOnly --outDir dist/types` |
| `pnpm typecheck` | `tsc --noEmit` (verifica tipos sin emitir) |
| `pnpm lint` | Biome check (lint + format) sobre `src/` |
| `pnpm lint:fix` | Biome con `--write` (corrige automático) |
| `pnpm format` | Biome format con `--write` |
| `pnpm clean` | `rm -rf dist` |
| `pnpm release` | `pnpm build && changeset publish` (uso manual; el flujo normal es vía Changesets en CI) |

`prepublishOnly` corre `clean` + `build` automáticamente al publicar.

> **No hay framework de pruebas configurado.** Todo se valida por typecheck + uso real desde frontend/backend. Si agregas tests en el futuro, configurar Vitest y excluirlo del build (`tsconfig.build.json` ya excluye `**/*.test.ts`).

## Stack

- TypeScript ≥ 5.4 estricto, target ES2020, module NodeNext
- Zod ^4.0.0 como **peer dependency** (no se bundlea — el consumidor lo provee)
- Build dual ESM + CJS + tipos separados (3 invocaciones de `tsc`)
- Linter/formatter: Biome 2 (no ESLint, no Prettier). Estilo: comillas simples, sin punto y coma, indent 2 espacios, line width 100. Lo aplica Biome — correr `pnpm format`.
- Changesets para versionado y release

## Entry points (subpaths exportados)

Los siete subpaths definidos en `package.json#exports`:

| Import | Contenido |
|---|---|
| `@varolisto/shared-schemas` | Re-exporta `form`, `validators`, `enums`, `domain`, `api`, `zStr`. **`admin` se expone como namespace** (`import { admin } from '@varolisto/shared-schemas'`) |
| `@varolisto/shared-schemas/form` | Schemas Zod del formulario público de solicitud (paso1–paso7) + `solicitudSchema` combinado |
| `@varolisto/shared-schemas/validators` | `validateClabe`, `getBancoFromClabe`, `validateCurp`/`isValidCurp`, `validateRfc`/`isValidRfc`, `validateTelefonoMx`/`isValidTelefonoMx` |
| `@varolisto/shared-schemas/enums` | 25 enums `as const` + tipos inferidos |
| `@varolisto/shared-schemas/domain` | Schemas del modelo persistido (Prisma → Zod) |
| `@varolisto/shared-schemas/api` | Schemas request/response de los endpoints públicos (`/api/solicitudes`, cotización) |
| `@varolisto/shared-schemas/admin` | Schemas request/response de los endpoints `/api/admin/solicitudes/*` |

> **Nota sobre `admin`**: a diferencia de los otros módulos, `admin` se reexporta como **namespace** desde el barrel raíz (`export * as admin`). Desde el subpath dedicado se importa plano. Si vas a tocar `admin/index.ts` mantén el patrón: el barrel raíz no debe colisionar entre nombres de schemas admin y públicos.

## Estructura de directorios

```
src/
├── index.ts                     # Barrel raíz — re-exporta todo (admin como namespace)
├── helpers.ts                   # zStr() — único helper compartido
│
├── form/                        # Formulario público de solicitud (7 pasos)
│   ├── paso1.ts                 # Datos personales: nombre, CURP, sexo, fechaNacimiento
│   ├── paso2.ts                 # Dirección: CP, colonia, calle, municipio, estado
│   ├── paso3.ts                 # Crédito: monto (2k–20k), plazo, destino
│   ├── paso4.ts                 # Situación laboral, ingresos, deudas
│   ├── paso5.ts                 # Dos referencias personales (con isValidTelefonoMx)
│   ├── paso6.ts                 # tipoIdentificacion + archivosDeclarados (1–7), exporta ACCEPTED_MIME_TYPES y MAX_FILE_SIZE_BYTES
│   ├── paso7.ts                 # aceptaPrivacidad + aceptaTerminos (literal true)
│   └── index.ts                 # Combina los 7 pasos en solicitudSchema con .and() encadenado
│
├── enums/                       # 25 enums as const + tipos
│   ├── index.ts                 # Barrel
│   ├── sexo.ts, tipoActividad.ts, tipoIdentificacion.ts, ...
│   └── (sigue Modelo de Datos v1.2 — nombres en español)
│
├── validators/                  # Validadores reutilizables (no Zod schemas, funciones puras)
│   ├── clabe.ts                 # validateClabe (algoritmo Banxico) + getBancoFromClabe (lookup tabla)
│   ├── curp.ts                  # validateCurp → { valid, reason? }, isValidCurp → boolean
│   ├── rfc.ts                   # validateRfc → { valid, tipo, reason? }, isValidRfc → boolean
│   ├── telefonoMx.ts            # validateTelefonoMx → { valid, normalized, reason? }, isValidTelefonoMx → boolean
│   └── index.ts
│
├── domain/                      # Schemas del modelo persistido (refleja Prisma)
│   ├── solicitante.ts, direccion.ts, ingreso.ts, referencia.ts
│   ├── solicitud.ts, scoring.ts, archivo.ts
│   ├── prestamo.ts, pago.ts
│   └── index.ts
│
├── api/                         # Endpoints públicos
│   ├── crearSolicitud.ts        # crearSolicitudRequestSchema, crearSolicitudResponseSchema
│   ├── generarCotizacion.ts
│   └── index.ts
│
└── admin/                       # Endpoints /api/admin/solicitudes/* (uno por operación)
    ├── filtros.ts               # listaFiltrosSchema (query params del listado)
    ├── lista.ts                 # solicitudResumenSchema, listaResponseSchema
    ├── detalle.ts               # detalleResponseSchema (solicitud + solicitante + ingresos + referencias + archivos + scoring + parametros + eventos)
    ├── scoring.ts               # cerrarScoringRequestSchema (V5/V7 + opcional v2_override)
    ├── calcular-propuesta.ts    # request + response + filaAmortizacionSchema
    ├── emitir-propuesta.ts
    ├── aprobar.ts, rechazar.ts, cancelar.ts
    ├── pedir-info.ts, marcar-info-recibida.ts
    ├── modificar-terminos.ts
    ├── archivo-upload.ts        # adminUploadUrlRequestSchema/ResponseSchema
    ├── datos-personales.ts      # actualizarDatosPersonalesAdminRequestSchema (CLABE deudor + aval)
    └── index.ts                 # Re-exporta todo + MOTIVO_CANCELACION (alias de enum)

dist/                            # Generado por build — no editar
├── esm/, cjs/, types/
```

## Convenciones del paquete

### Estilo de schemas

- **Mensajes de error en español** y dirigidos al usuario final (lo lee humano en el form): `"Mínimo 2 caracteres"`, `"Selecciona un tipo de identificación"`. Evitar mensajes técnicos.
- **`zStr(msg?)`** es el atajo canónico para campos de texto requeridos: hace `z.string({ error: () => msg }).trim().min(1, msg)`. Usarlo siempre que necesites un string no vacío con trim. No reimplementar el patrón.
- **Enums vía `z.enum(MI_ENUM, { error: () => "Selecciona ..." })`** donde `MI_ENUM` viene de `src/enums/`. No usar `z.enum(["a", "b"])` con literales inline en schemas — perdés la fuente única de verdad.
- **Refinements custom (CLABE, CURP, teléfono)**: importar el helper `isValidX` desde `src/validators/` y pasarlo a `.refine(isValidX, "Mensaje")`. No copiar regex.
- **Cross-field validation**: usar `.refine()` o `.superRefine()` a nivel object, no a nivel campo.

### Naming

- **Schemas Zod**: `<nombre>Schema` (ej. `paso1Schema`, `cerrarScoringRequestSchema`).
- **Tipos inferidos**: PascalCase, sin sufijo `Schema` (ej. `Paso1Data`, `CerrarScoringRequest`). Usar `z.infer<typeof miSchema>` o `import("zod").infer` (este último cuando hay problema de circular import).
- **Enums**: SCREAMING_SNAKE_CASE como `as const` (ej. `TIPO_ACTIVIDAD`, `MOTIVO_RECHAZO`). Tipo inferido en PascalCase (`TipoActividad`).
- **Validators**: `validateX` devuelve objeto con `{ valid, reason? }`; `isValidX` devuelve `boolean` para usar en refinements.

### Imports y módulos

- TypeScript con `module: NodeNext` → **todos los imports relativos llevan `.js`** aunque el archivo fuente sea `.ts`. Ej: `from "./paso1.js"`.
- No usar `import type` en barrels que reexportan ambos (valor + tipo) — usar `export { x }` y `export type { X }` separados, como en `form/index.ts`.

### Sincronización con el backend

> **Crítico**: los enums de este paquete deben mantenerse sincronizados con los `enum` del `schema.prisma` del backend (`mx-varolisto-api-backend`). Cuando agregues o modifiques un enum aquí, **el mismo cambio debe ir en el schema de Prisma** y crearse la migración correspondiente. Los enums son la fuente de verdad; Prisma debe reflejarlos.

Cuando cambies un schema de `domain/` o `admin/`, verifica que el backend (`src/modules/<dominio>`) esté usando los nuevos campos antes de publicar el bump.

## Build dual ESM + CJS

`pnpm build` corre tres invocaciones de `tsc`:

1. **`build:esm`** → `dist/esm/` con `module: NodeNext` (mantiene `.js` en imports, output ESM puro).
2. **`build:cjs`** → `dist/cjs/` con `module: CommonJS, moduleResolution: node`.
3. **`build:types`** → `dist/types/` con `--emitDeclarationOnly`.

`tsconfig.build.json` extiende `tsconfig.json` y desactiva sourceMap/declarationMap para reducir el tamaño del paquete publicado. Excluye `**/*.test.ts`.

`package.json#exports` apunta a los tres directorios por subpath con condicionales `import` / `require` / `types`. Esto garantiza que el consumidor obtenga el formato correcto sin importar si usa Next.js (ESM), un test runner CJS, o consume tipos desde TypeScript.

## Publicación (Changesets)

El paquete usa [Changesets](https://github.com/changesets/changesets) para versionado y release a GitHub Packages. **No hay tags manuales ni `npm version` directo.**

### Flujo del autor del cambio

1. Trabajar en branch de feature.
2. Antes de abrir el PR:

   ```bash
   pnpm changeset
   ```

   Selecciona el tipo de bump (patch / minor / major) y describe el cambio. Crea un archivo en `.changeset/` que se commitea junto al PR.

3. Abrir PR a `main` (o a `sandbox` si así lo pide el repo).

### Flujo de release (automático en CI)

Cuando un PR con archivos de changeset se mergea a `main`:

1. La GitHub Action `release.yml` detecta los archivos de changeset.
2. Crea automáticamente un PR titulado `chore: release packages` que actualiza `version` en `package.json`, regenera `CHANGELOG.md` y elimina los archivos de changeset consumidos.
3. Al mergear ese PR a `main`, la Action publica automáticamente el paquete a GitHub Packages.

> Workflows en `.github/workflows/`: `publish.yml` y `release.yml`.

### Hotfix manual (excepción)

Si un hotfix urgente requiere bumpear sin pasar por changesets, usar `pnpm release` (`pnpm build && changeset publish`) con la versión ya actualizada en `package.json`. Documentar el motivo en el commit. Debe ser excepcional.

## Instalación en consumidores

`.npmrc` requerido:

```ini
@varolisto:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=GITHUB_TOKEN_CON_READ_PACKAGES
```

Luego:

```bash
pnpm add @varolisto/shared-schemas
pnpm add -D zod  # peer dependency
```

Imports típicos:

```typescript
// Schemas del formulario (frontend)
import { paso1Schema, paso6Schema, solicitudSchema } from "@varolisto/shared-schemas/form"
import type { Paso1Data, SolicitudCompleta } from "@varolisto/shared-schemas/form"

// API pública (frontend + backend)
import { crearSolicitudRequestSchema } from "@varolisto/shared-schemas/api"
import type { CrearSolicitudRequest } from "@varolisto/shared-schemas/api"

// Endpoints admin (backend + admin frontend)
import { aprobarRequestSchema, listaFiltrosSchema } from "@varolisto/shared-schemas/admin"

// Enums (anywhere)
import { TIPO_ACTIVIDAD, ESTADO_SOLICITUD } from "@varolisto/shared-schemas/enums"
import type { TipoActividad } from "@varolisto/shared-schemas/enums"

// Validadores (frontend para refines locales, backend para sanity checks)
import { isValidCurp, validateClabe, getBancoFromClabe } from "@varolisto/shared-schemas/validators"

// Helper
import { zStr } from "@varolisto/shared-schemas"
```
