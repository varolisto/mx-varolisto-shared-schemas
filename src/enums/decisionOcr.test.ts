import { describe, expect, it } from 'vitest'
import { DECISION_OCR, type DecisionOcr } from './decisionOcr.js'

describe('DECISION_OCR', () => {
  it('contiene exactamente los tres outcomes del cruce documental Nivel 1', () => {
    expect(DECISION_OCR).toEqual([
      'validacion_automatica_ok',
      'bandera_revision_manual',
      'rechazo_automatico_por_fraude',
    ])
  })

  it('es readonly tuple (as const) para que TS infiera la unión literal', () => {
    const valor: DecisionOcr = 'bandera_revision_manual'
    expect(DECISION_OCR.includes(valor)).toBe(true)
  })
})
