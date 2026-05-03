import { describe, expect, it } from 'vitest'
import { paso2Schema } from './paso2.js'

const base = {
  montoSolicitado: 10000,
  plazoMeses: '4' as const,
  destinoPrestamo: 'capital_trabajo' as const,
}

describe('paso2Schema', () => {
  it('acepta datos de crédito válidos', () => {
    expect(paso2Schema.safeParse(base).success).toBe(true)
  })

  it('rechaza monto menor a 2000', () => {
    const r = paso2Schema.safeParse({ ...base, montoSolicitado: 1999 })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues[0]?.message).toBe('Mínimo $2,000')
    }
  })

  it('rechaza monto mayor a 20000', () => {
    const r = paso2Schema.safeParse({ ...base, montoSolicitado: 20001 })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues[0]?.message).toBe('Máximo $20,000')
    }
  })

  it('rechaza monto no numérico', () => {
    const r = paso2Schema.safeParse({ ...base, montoSolicitado: 'diez mil' })
    expect(r.success).toBe(false)
  })

  it('rechaza plazo fuera del enum', () => {
    const r = paso2Schema.safeParse({ ...base, plazoMeses: '12' })
    expect(r.success).toBe(false)
  })

  it('rechaza destino fuera del enum', () => {
    const r = paso2Schema.safeParse({ ...base, destinoPrestamo: 'vacaciones' })
    expect(r.success).toBe(false)
  })

  it('acepta monto en los límites exactos (2000 y 20000)', () => {
    expect(paso2Schema.safeParse({ ...base, montoSolicitado: 2000 }).success).toBe(true)
    expect(paso2Schema.safeParse({ ...base, montoSolicitado: 20000 }).success).toBe(true)
  })
})
