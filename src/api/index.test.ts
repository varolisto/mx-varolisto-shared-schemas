import { describe, expect, it } from 'vitest'
import { validSolicitudCompleta } from '../__fixtures__/solicitud.fixture.js'
import { crearSolicitudRequestSchema, crearSolicitudResponseSchema } from './crearSolicitud.js'
import {
  generarCotizacionRequestSchema,
  generarCotizacionResponseSchema,
} from './generarCotizacion.js'

describe('crearSolicitudRequestSchema', () => {
  it('acepta la solicitud completa válida', () => {
    expect(crearSolicitudRequestSchema.safeParse(validSolicitudCompleta).success).toBe(true)
  })

  it('rechaza solicitud con campo requerido faltante', () => {
    const { curp: _, ...sinCurp } = validSolicitudCompleta
    expect(crearSolicitudRequestSchema.safeParse(sinCurp).success).toBe(false)
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
