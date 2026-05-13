---
'@varolisto/shared-schemas': minor
---

Agregar enums y schema de dominio para validación documental Nivel 1 (OCR del Bloque 2A del rediseño de scoring v7).

**Enums nuevos en `@varolisto/shared-schemas/enums`:**

- `DECISION_OCR`: outcome del cruce documental (`validacion_automatica_ok`, `bandera_revision_manual`, `rechazo_automatico_por_fraude`).
- `ESTADO_VALIDACION_OCR`: ciclo de vida del job (`pendiente`, `procesando`, `completado`, `fallido`).
- `PROVEEDOR_VALIDACION_OCR`: proveedor activo + reservados para migración futura (`aws_textract`, `tesseract`, `google_document_ai`).

**Schema de dominio nuevo en `@varolisto/shared-schemas/domain`:**

- `archivoValidacionDomainSchema`: representa una corrida de OCR sobre un archivo (INE / comprobante de domicilio). Incluye razones estructuradas del cruce, campos comparados con confidence por campo, payload crudo del proveedor (`rawPayloadTextract`) y campos de auditoría. Cross-field refines: `estado=completado` exige `decisionOcr` no nula; `estado=fallido` exige `errorDetalle` y veta `decisionOcr`.

El backend consumirá estos shapes al persistir en la tabla `archivo_validacion` (PR equivalente en `mx-varolisto-api-backend`).
