---
'@varolisto/shared-schemas': minor
---

Agrega `gastoMensual` numérico obligatorio al `paso4Schema` (Bloque 1.A del rediseño de scoring v7).

- Campo nuevo: `gastoMensual: z.number().min(0)` requerido. Representa el gasto mensual total del solicitante en pesos (renta, transporte, comida, deudas, etc.) — insumo para `capacidad_disponible = ingreso - gasto` del modelo v7.
- Refine cruzado: `gastoMensual ≤ ingresoMensual`, mensaje "Tu gasto no puede ser mayor que tu ingreso".
- Constantes nuevas en `constants.ts`: `GASTO_MENSUAL_MIN = 0`, `GASTO_MENSUAL_STEP = 500`.
- `tieneDeudas`, `cantidadDeudas`, `montoTotalDeudas`, `pagoMensualDeudas` se mantienen en el contrato (transición — el frontend enviará dummies `tieneDeudas='no'` mientras el backend deja de pedirlos en el Bloque 2).
