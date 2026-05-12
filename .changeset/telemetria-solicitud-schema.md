---
'@varolisto/shared-schemas': minor
---

feat(form): add `telemetriaSolicitudSchema` for passive form telemetry (Bloque 1.B)

New optional `telemetria` block on `crearSolicitudRequestSchema` capturing:
- `iniciadoEn` / `enviadoEn` ISO timestamps + `duracionTotalMs` (wall-clock total).
- `tiemposPaso` (paso1Ms … paso7Ms, nullable per step).
- `tiempoCapturaFormularioMs` — derived sum of steps 2–6 (the only signal
  consumed by the Bloque 2C anti-fraud scoring). Steps 1 (landing) and 7
  (review) are captured separately on purpose so a future analyst can't
  accidentally do `sum(paso1..paso7)` and contaminate the signal.
- `edicionesPorCampo` record (max 200 keys, alphanumeric/._- keys).
- `dispositivo` (userAgent, viewport, idioma, zonaHoraria, plataforma?).
- `red.referrer?`, `fingerprint?`.
- `geolocalizacion?` (lat/lon ranges, ISO `capturadaEn`).

Cross-field refines: `enviadoEn ≥ iniciadoEn`; `tiempoCapturaFormularioMs`
equals the sum of pasos 2–6 when all five are measured (skipped if any
is null). New length constants for user-agent/referrer/fingerprint/
locale/timezone/plataforma + edition keys live in `constants.ts`.

The schema is the input contract — backend and frontend will adopt it in
their own PRs.
