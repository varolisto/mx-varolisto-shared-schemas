---
"@varolisto/shared-schemas": minor
---

Refuerza validación de seguridad en schemas de formulario público.

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
