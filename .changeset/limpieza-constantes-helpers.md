---
"@varolisto/shared-schemas": minor
---

Centraliza reglas de negocio y helpers Zod reutilizables.

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
