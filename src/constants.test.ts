import { describe, expect, it } from 'vitest'
import {
  FOLIO_REGEX,
  GASTO_MENSUAL_MIN,
  GASTO_MENSUAL_STEP,
  MONTO_MAX,
  MONTO_MIN,
  NOTA_OPERADOR_MAX,
  NOTA_OPERADOR_MIN,
  PLAZO_MAX,
  PLAZO_MIN,
} from './constants.js'

describe('constantes de reglas de negocio', () => {
  describe('MONTO_MIN / MONTO_MAX', () => {
    it('MONTO_MIN es 2000', () => {
      expect(MONTO_MIN).toBe(2000)
    })

    it('MONTO_MAX es 20000', () => {
      expect(MONTO_MAX).toBe(20000)
    })
  })

  describe('PLAZO_MIN / PLAZO_MAX', () => {
    it('PLAZO_MIN es 2', () => {
      expect(PLAZO_MIN).toBe(2)
    })

    it('PLAZO_MAX es 6', () => {
      expect(PLAZO_MAX).toBe(6)
    })
  })

  describe('NOTA_OPERADOR_MIN / NOTA_OPERADOR_MAX', () => {
    it('NOTA_OPERADOR_MIN es 10', () => {
      expect(NOTA_OPERADOR_MIN).toBe(10)
    })

    it('NOTA_OPERADOR_MAX es 1000', () => {
      expect(NOTA_OPERADOR_MAX).toBe(1000)
    })
  })

  describe('GASTO_MENSUAL_MIN / GASTO_MENSUAL_STEP', () => {
    it('GASTO_MENSUAL_MIN es 0', () => {
      expect(GASTO_MENSUAL_MIN).toBe(0)
    })

    it('GASTO_MENSUAL_STEP es 500', () => {
      expect(GASTO_MENSUAL_STEP).toBe(500)
    })
  })

  describe('FOLIO_REGEX', () => {
    it('acepta folio con formato VL-AAAAMM-NNNN', () => {
      expect(FOLIO_REGEX.test('VL-202601-0042')).toBe(true)
    })

    it('acepta folio del fixture de dominio (VL-202601-0042)', () => {
      expect(FOLIO_REGEX.test('VL-202601-0042')).toBe(true)
    })

    it('rechaza folio sin prefijo VL', () => {
      expect(FOLIO_REGEX.test('XX-202601-0042')).toBe(false)
    })

    it('rechaza folio con separador faltante', () => {
      expect(FOLIO_REGEX.test('VL2026010042')).toBe(false)
    })

    it('rechaza folio con mes de 4 dígitos', () => {
      expect(FOLIO_REGEX.test('VL-20260101-0042')).toBe(false)
    })

    it('rechaza folio con secuencia de 3 dígitos en lugar de 4', () => {
      expect(FOLIO_REGEX.test('VL-202601-042')).toBe(false)
    })

    it('rechaza folio con letras en la parte numérica', () => {
      expect(FOLIO_REGEX.test('VL-ABCDEF-0042')).toBe(false)
    })
  })
})
