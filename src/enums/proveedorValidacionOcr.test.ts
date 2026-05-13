import { describe, expect, it } from 'vitest'
import { PROVEEDOR_VALIDACION_OCR, type ProveedorValidacionOcr } from './proveedorValidacionOcr.js'

describe('PROVEEDOR_VALIDACION_OCR', () => {
  it('incluye aws_textract como proveedor Nivel 1 activo', () => {
    expect(PROVEEDOR_VALIDACION_OCR).toContain('aws_textract')
  })

  it('reserva entradas para futuros proveedores Nivel 1 (tesseract, google_document_ai)', () => {
    expect(PROVEEDOR_VALIDACION_OCR).toEqual(['aws_textract', 'tesseract', 'google_document_ai'])
  })

  it('expone el tipo unión vía ProveedorValidacionOcr', () => {
    const valor: ProveedorValidacionOcr = 'aws_textract'
    expect(PROVEEDOR_VALIDACION_OCR.includes(valor)).toBe(true)
  })
})
