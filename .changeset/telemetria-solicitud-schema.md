---
'@varolisto/shared-schemas': minor
---

feat(form): add `telemetriaSolicitudSchema` for passive form telemetry (Bloque 1.B)

New optional `telemetria` block on `crearSolicitudRequestSchema` capturing:
- `iniciadoEn` / `enviadoEn` ISO timestamps + `duracionTotalMs`
- `tiemposPaso` (paso1Ms … paso7Ms, nullable per step)
- `edicionesPorCampo` record (max 200 keys, alphanumeric/._- keys)
- `dispositivo` (userAgent, viewport, idioma, zonaHoraria, plataforma?)
- `red.referrer?`, `fingerprint?`
- `geolocalizacion?` (lat/lon ranges, ISO `capturadaEn`)

Cross-field refine: `enviadoEn ≥ iniciadoEn`. New length constants for
user-agent/referrer/fingerprint/locale/timezone/plataforma + edition keys
live in `constants.ts`. The schema is the input contract — backend and
frontend will adopt it in their own PRs.
