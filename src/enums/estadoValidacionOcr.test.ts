import { describe, expect, it } from 'vitest'
import { ESTADO_VALIDACION_OCR, type EstadoValidacionOcr } from './estadoValidacionOcr.js'

describe('ESTADO_VALIDACION_OCR', () => {
  it('contiene los cuatro estados del job de validación documental', () => {
    expect(ESTADO_VALIDACION_OCR).toEqual(['pendiente', 'procesando', 'completado', 'fallido'])
  })

  it('infiere unión literal a través de DecisionOcr', () => {
    const valor: EstadoValidacionOcr = 'procesando'
    expect(ESTADO_VALIDACION_OCR.includes(valor)).toBe(true)
  })
})
