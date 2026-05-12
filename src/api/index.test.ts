import { describe, expect, it } from 'vitest'
import { validSolicitudCompleta } from '../__fixtures__/solicitud.fixture.js'
import { crearSolicitudRequestSchema, crearSolicitudResponseSchema } from './crearSolicitud.js'
import {
  generarCotizacionRequestSchema,
  generarCotizacionResponseSchema,
} from './generarCotizacion.js'

const telemetriaValida = {
  iniciadoEn: '2026-05-12T14:00:00.000Z',
  enviadoEn: '2026-05-12T14:08:30.000Z',
  duracionTotalMs: 510_000,
  tiemposPaso: {
    paso1Ms: 90_000,
    paso2Ms: 60_000,
    paso3Ms: 75_000,
    paso4Ms: 80_000,
    paso5Ms: 60_000,
    paso6Ms: 90_000,
    paso7Ms: 55_000,
  },
  tiempoCapturaFormularioMs: 365_000,
  edicionesPorCampo: { nombre: 1, curp: 2 },
  dispositivo: {
    userAgent: 'Mozilla/5.0',
    viewport: { width: 390, height: 844 },
    idioma: 'es-MX',
    zonaHoraria: 'America/Mexico_City',
  },
}

describe('crearSolicitudRequestSchema', () => {
  it('acepta la solicitud completa válida', () => {
    expect(crearSolicitudRequestSchema.safeParse(validSolicitudCompleta).success).toBe(true)
  })

  it('rechaza solicitud con campo requerido faltante', () => {
    const { curp: _, ...sinCurp } = validSolicitudCompleta
    expect(crearSolicitudRequestSchema.safeParse(sinCurp).success).toBe(false)
  })

  it('acepta solicitud sin bloque telemetria (opcional)', () => {
    expect(crearSolicitudRequestSchema.safeParse(validSolicitudCompleta).success).toBe(true)
  })

  it('acepta solicitud con bloque telemetria válido', () => {
    expect(
      crearSolicitudRequestSchema.safeParse({
        ...validSolicitudCompleta,
        telemetria: telemetriaValida,
      }).success,
    ).toBe(true)
  })

  it('rechaza solicitud con bloque telemetria malformado', () => {
    expect(
      crearSolicitudRequestSchema.safeParse({
        ...validSolicitudCompleta,
        telemetria: { ...telemetriaValida, duracionTotalMs: -1 },
      }).success,
    ).toBe(false)
  })
})

describe('crearSolicitudResponseSchema', () => {
  it('acepta respuesta válida', () => {
    const r = crearSolicitudResponseSchema.safeParse({
      folio: 'VL-202601-0042',
      estado: 'recibida',
      fechaCreacion: new Date().toISOString(),
      tiempoEsperadoRespuesta: '24-48 horas hábiles',
    })
    expect(r.success).toBe(true)
  })

  it('rechaza folio con formato incorrecto', () => {
    const r = crearSolicitudResponseSchema.safeParse({
      folio: 'FOLIO-INVALIDO',
      estado: 'recibida',
      fechaCreacion: new Date().toISOString(),
      tiempoEsperadoRespuesta: '24h',
    })
    expect(r.success).toBe(false)
  })
})

describe('generarCotizacionSchemas', () => {
  it('generarCotizacionRequestSchema acepta objeto vacío', () => {
    expect(generarCotizacionRequestSchema.safeParse({}).success).toBe(true)
  })

  it('generarCotizacionResponseSchema acepta objeto vacío', () => {
    expect(generarCotizacionResponseSchema.safeParse({}).success).toBe(true)
  })
})
