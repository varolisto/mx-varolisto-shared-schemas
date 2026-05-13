import { describe, expect, it } from 'vitest'
import { archivoValidacionDomainSchema } from './archivoValidacion.js'

const ARCHIVO_ID = '6f1e3b6a-9c0e-4f4b-9c1f-8d2a2e7e0e51'
const VALIDACION_ID = '11111111-2222-4333-8444-555555555555'

const baseCompletada = {
  id: VALIDACION_ID,
  archivoId: ARCHIVO_ID,
  intento: 1,
  estado: 'completado',
  decisionOcr: 'validacion_automatica_ok',
  proveedor: 'aws_textract',
  razonEstructurada: { curpCoincide: true, nombreCoincide: true, fechaCoincide: true },
  camposCruzados: {
    curp: { declarado: 'GORM850712HCSRRR03', extraido: 'GORM850712HCSRRR03', confidence: 99.4 },
  },
  rawPayloadTextract: { Blocks: [] },
  errorDetalle: null,
  procesadoAt: '2026-05-12T18:30:00.000Z',
  createdAt: '2026-05-12T18:29:00.000Z',
}

describe('archivoValidacionDomainSchema', () => {
  it('parsea un caso completado con decisión OCR válida', () => {
    const resultado = archivoValidacionDomainSchema.parse(baseCompletada)
    expect(resultado.estado).toBe('completado')
    expect(resultado.decisionOcr).toBe('validacion_automatica_ok')
    expect(resultado.proveedor).toBe('aws_textract')
  })

  it('permite decisionOcr=null mientras el job está pendiente (sin procesar)', () => {
    const resultado = archivoValidacionDomainSchema.parse({
      ...baseCompletada,
      estado: 'pendiente',
      decisionOcr: null,
      razonEstructurada: null,
      camposCruzados: null,
      rawPayloadTextract: null,
      procesadoAt: null,
    })
    expect(resultado.estado).toBe('pendiente')
    expect(resultado.decisionOcr).toBeNull()
  })

  it('permite decisionOcr=null mientras el job está procesando', () => {
    const resultado = archivoValidacionDomainSchema.parse({
      ...baseCompletada,
      estado: 'procesando',
      decisionOcr: null,
      razonEstructurada: null,
      camposCruzados: null,
      rawPayloadTextract: null,
      procesadoAt: null,
    })
    expect(resultado.estado).toBe('procesando')
  })

  it('rechaza estado=completado con decisionOcr=null', () => {
    const resultado = archivoValidacionDomainSchema.safeParse({
      ...baseCompletada,
      decisionOcr: null,
    })
    expect(resultado.success).toBe(false)
    if (!resultado.success) {
      expect(resultado.error.issues[0].path).toContain('decisionOcr')
    }
  })

  it('rechaza estado=fallido sin errorDetalle', () => {
    const resultado = archivoValidacionDomainSchema.safeParse({
      ...baseCompletada,
      estado: 'fallido',
      decisionOcr: null,
      errorDetalle: null,
    })
    expect(resultado.success).toBe(false)
    if (!resultado.success) {
      expect(resultado.error.issues[0].path).toContain('errorDetalle')
    }
  })

  it('rechaza estado=fallido con decisionOcr no nula (fallar no es una decisión OCR)', () => {
    const resultado = archivoValidacionDomainSchema.safeParse({
      ...baseCompletada,
      estado: 'fallido',
      decisionOcr: 'validacion_automatica_ok',
      errorDetalle: 'Textract API timeout',
    })
    expect(resultado.success).toBe(false)
    if (!resultado.success) {
      expect(resultado.error.issues[0].path).toContain('decisionOcr')
    }
  })
})
