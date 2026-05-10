---
'@varolisto/shared-schemas': minor
---

Añade `getPlazosDisponibles(monto)` y `getPlazoMaximo(monto)` en `domain/`. Devuelven los plazos válidos según el monto solicitado (tramos: ≤$3,499→2-3m, ≤$7,000→2-4m, ≤$12,000→2-5m, >$12,000→2-6m). Fuente única de verdad para frontend (filtrado del grid de plazos) y backend (validación dura del endpoint de creación de solicitud).
