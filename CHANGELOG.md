# Changelog

## 0.9.1

### Patch Changes

- 64702e9: Corrige inferencia de tipos en `paso5Schema` (`Paso5Data`).

  El refactor de PR #28 introdujo el helper `referenciaFormFields(prefix)` que construía las claves del schema con template literals computados (`` [`${prefix}Nombre`] ``). TypeScript no puede inferir claves literales a partir de plantillas dinámicas, así que el tipo resultante perdía precisión: `ref1Nombre`, `ref1Telefono`, `ref2Nombre` y `ref2Telefono` quedaban tipados como `string | undefined` en lugar de `string`. Esto rompía la compilación en consumidores (backend, frontend) que asignaban `Paso5Data` a payloads con campos requeridos.

  Reemplaza el helper por la composición explícita del objeto Zod con claves literales (los validadores comunes se conservan como constantes locales). El schema en runtime es idéntico — solo cambia el tipo inferido.

## 0.9.0

### Minor Changes

- cd615d7: Refuerza validación de seguridad en schemas de formulario público.

  **Cambios de validación (form/):**

  - `paso6.archivoDeclarado.mimeType`: ahora `z.enum(ACCEPTED_MIME_TYPES)` en lugar de `z.string().min(1)` — rechaza `text/html`, `application/javascript` y otros MIME no permitidos.
  - `paso6.archivoDeclarado.nombreOriginal`: añade `.refine()` que rechaza `..`, `/`, `\` y null bytes para prevenir path traversal.
  - `paso1`: añade `.max(80)` a `nombre`, `.max(60)` a `apellidoPaterno` y `apellidoMaterno`.
  - `paso3`: añade `.max(120)` a `colonia`, `municipio`, `calle`; `.max(20)` a `numeroExterior`, `numeroInterior`.
  - `paso4`: añade `.max(120)` a `nombreEmpleadorNegocio`.

  **Nuevos exports en `constants.ts`:**

  - `NOMBRE_MAX_LENGTH`, `APELLIDO_MAX_LENGTH`, `EMPLEADOR_MAX_LENGTH`
  - `DIRECCION_TEXTO_MAX_LENGTH`, `DIRECCION_NUMERO_MAX_LENGTH`
  - `ARCHIVO_NOMBRE_MAX_LENGTH`

  `domain/` y `form/` ahora comparten estas constantes para mantener los límites alineados.

  **Por qué importa:** Sin `.max()` el frontend permitía strings arbitrariamente largos que el backend truncaba en silencio. El `mimeType` sin whitelist permitía declarar archivos con tipos peligrosos. El `nombreOriginal` sin filtro permitía path traversal cuando el backend lo usaba en construcción de paths.

## 0.8.0

### Minor Changes

- 5c85281: Centraliza reglas de negocio y helpers Zod reutilizables.

  **Nuevos exports públicos:**

  - `constants.ts`: `MONTO_MIN`, `MONTO_MAX`, `PLAZO_MIN`, `PLAZO_MAX`, `NOTA_OPERADOR_MIN`, `NOTA_OPERADOR_MAX`, `FOLIO_REGEX`
  - `helpers.ts`: `enumSelecciona()`, `uuidSchema`

  **Refactors internos (sin cambio de comportamiento):**

  - Schemas de `domain/`, `api/`, `admin/` y `form/` ahora usan las constantes y helpers centralizados
  - Helper privado `referenciaFormFields` en `paso5.ts` elimina el bloque duplicado ref1/ref2
  - 6 enums sin uso interno marcados `@deprecated`: `TIPO_PAGO`, `ESTADO_PRESTAMO`, `CONCEPTO_CONDONABLE`, `NUMERO_CREDITO`, `PROPOSITO_TOKEN`, `TIPO_AJUSTE`

  **Documentación:**

  - TDD como requisito obligatorio en `CLAUDE.md` (alineado con backend y frontend)
  - Convenciones de centralización de constantes con ejemplos MAL/BIEN

## 0.7.0

### Minor Changes

- 343df87: Agrega suite de tests con Vitest (164 tests, ≥90% cobertura en validators/ y form/paso\*.ts), reglas de capa con dependency-cruiser, y CI integrado. Sin cambios en la API pública del paquete.

## 0.6.3

### Patch Changes

- cd689c4: docs: refresh CLAUDE.md and README.md to reflect current package state (7-step form, admin module, Changesets workflow); also configure Claude Code hooks (.claude/) — tooling-only.

  README.md ships with the tarball, hence the patch bump.

## [0.5.0] - 2026-04-26

### Added

- New enum `MOTIVO_CANCELACION` / `MotivoCancelacion` in `src/enums/motivoCancelacion.ts`
- New admin module `src/admin/` with schemas for all admin endpoints:
  - `filtros.ts` — `listaFiltrosSchema` for listing query params
  - `lista.ts` — `solicitudResumenSchema`, `listaResponseSchema` for paginated list
  - `detalle.ts` — `detalleResponseSchema` with full solicitud, solicitante, ingresos, referencias, archivos, scoring, parametros, eventos
  - `scoring.ts` — `cerrarScoringRequestSchema` for closing V5/V7
  - `calcular-propuesta.ts` — `calcularPropuestaRequestSchema`, `calcularPropuestaResponseSchema`, `filaAmortizacionSchema`
  - `aprobar.ts` — `aprobarRequestSchema`
  - `modificar-terminos.ts` — `modificarTerminosRequestSchema`
  - `rechazar.ts` — `rechazarRequestSchema`
  - `cancelar.ts` — `cancelarRequestSchema`
  - `pedir-info.ts` — `pedirInfoRequestSchema`
  - `marcar-info-recibida.ts` — `marcarInfoRecibidaRequestSchema`
  - `archivo-upload.ts` — `adminUploadUrlRequestSchema`, `adminUploadUrlResponseSchema`
  - `emitir-propuesta.ts` — `emitirPropuestaRequestSchema`, `emitirPropuestaResponseSchema`
- New `./admin` subpath export in `package.json`
- `admin` namespace re-exported from root barrel (`src/index.ts`)

### Changed

- `MOTIVO_RECHAZO` extended with `fraude_detectado` value (backwards compatible — existing values unchanged)
- `solicitanteCompletoSchema` in `detalle.ts` includes `bloqueadoPorFraude: boolean`
- `solicitudCompletaSchema` in `detalle.ts` includes new approved-terms fields: `montoAprobado`, `plazoAprobado`, `tasaMensualAprobada`, `comisionAperturaAprobada`, `aprobadaAt`, `canceladaAt`, `motivoCancelacion`

## [0.4.1] - 2026-04-24

- Export `ArchivoDeclarado` and `archivoDeclaradoSchema` from `/form` barrel

## [0.4.0]

- Initial release with `paso5Schema` including `archivosDeclarados` and `sessionUuid`
