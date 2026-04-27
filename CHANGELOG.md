# Changelog

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
