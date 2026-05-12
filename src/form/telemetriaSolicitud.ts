import { z } from 'zod'
import {
  TELEMETRIA_CAMPO_KEY_REGEX,
  TELEMETRIA_CAMPO_MAX_LENGTH,
  TELEMETRIA_EDICIONES_MAX_KEYS,
  TELEMETRIA_EDICIONES_MAX_VALUE,
  TELEMETRIA_FINGERPRINT_MAX_LENGTH,
  TELEMETRIA_LOCALE_MAX_LENGTH,
  TELEMETRIA_PLATAFORMA_MAX_LENGTH,
  TELEMETRIA_REFERRER_MAX_LENGTH,
  TELEMETRIA_TIMEZONE_MAX_LENGTH,
  TELEMETRIA_USER_AGENT_MAX_LENGTH,
} from '../constants.js'

const milisegundosPasoSchema = z.number().int().nonnegative().nullable()

const tiemposPasoSchema = z.object({
  paso1Ms: milisegundosPasoSchema,
  paso2Ms: milisegundosPasoSchema,
  paso3Ms: milisegundosPasoSchema,
  paso4Ms: milisegundosPasoSchema,
  paso5Ms: milisegundosPasoSchema,
  paso6Ms: milisegundosPasoSchema,
  paso7Ms: milisegundosPasoSchema,
})

const edicionesPorCampoSchema = z
  .record(
    z.string().min(1).max(TELEMETRIA_CAMPO_MAX_LENGTH).regex(TELEMETRIA_CAMPO_KEY_REGEX),
    z.number().int().nonnegative().max(TELEMETRIA_EDICIONES_MAX_VALUE),
  )
  .refine(
    (val) => Object.keys(val).length <= TELEMETRIA_EDICIONES_MAX_KEYS,
    `Máximo ${TELEMETRIA_EDICIONES_MAX_KEYS} campos en edicionesPorCampo`,
  )

const dispositivoSchema = z.object({
  userAgent: z.string().max(TELEMETRIA_USER_AGENT_MAX_LENGTH),
  viewport: z.object({
    width: z.number().int().nonnegative(),
    height: z.number().int().nonnegative(),
  }),
  idioma: z.string().max(TELEMETRIA_LOCALE_MAX_LENGTH),
  zonaHoraria: z.string().max(TELEMETRIA_TIMEZONE_MAX_LENGTH),
  plataforma: z.string().max(TELEMETRIA_PLATAFORMA_MAX_LENGTH).optional(),
})

const redSchema = z.object({
  referrer: z.string().max(TELEMETRIA_REFERRER_MAX_LENGTH).optional(),
})

const geolocalizacionSchema = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  precisionMetros: z.number().nonnegative().optional(),
  capturadaEn: z.iso.datetime(),
})

export const telemetriaSolicitudSchema = z
  .object({
    iniciadoEn: z.iso.datetime(),
    enviadoEn: z.iso.datetime(),
    duracionTotalMs: z.number().int().nonnegative(),
    tiemposPaso: tiemposPasoSchema,
    edicionesPorCampo: edicionesPorCampoSchema,
    dispositivo: dispositivoSchema,
    red: redSchema.optional(),
    fingerprint: z.string().min(1).max(TELEMETRIA_FINGERPRINT_MAX_LENGTH).optional(),
    geolocalizacion: geolocalizacionSchema.optional(),
  })
  .refine((data) => Date.parse(data.enviadoEn) >= Date.parse(data.iniciadoEn), {
    message: 'enviadoEn no puede ser anterior a iniciadoEn',
    path: ['enviadoEn'],
  })

export type TelemetriaSolicitud = z.infer<typeof telemetriaSolicitudSchema>
