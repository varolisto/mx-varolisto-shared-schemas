import { describe, expect, it } from 'vitest'
import { paso5Schema } from './paso5.js'

const base = {
  ref1Nombre: 'María López',
  ref1Telefono: '5512345678',
  ref1Relacion: 'familiar' as const,
  ref1Email: 'maria@example.com',
  ref2Nombre: 'Pedro Sánchez',
  ref2Telefono: '5598765432',
  ref2Relacion: 'amigo' as const,
  ref2Email: '',
}

describe('paso5Schema', () => {
  it('acepta dos referencias válidas', () => {
    expect(paso5Schema.safeParse(base).success).toBe(true)
  })

  it('acepta sin email de referencia (campo opcional)', () => {
    const r = paso5Schema.safeParse({ ...base, ref1Email: undefined, ref2Email: undefined })
    expect(r.success).toBe(true)
  })

  it('acepta email vacío en referencia', () => {
    expect(paso5Schema.safeParse({ ...base, ref1Email: '', ref2Email: '' }).success).toBe(true)
  })

  it('rechaza ref1Nombre con caracteres no permitidos', () => {
    const r = paso5Schema.safeParse({ ...base, ref1Nombre: 'Juan123' })
    expect(r.success).toBe(false)
  })

  it('rechaza ref1Nombre con menos de 2 caracteres', () => {
    const r = paso5Schema.safeParse({ ...base, ref1Nombre: 'X' })
    expect(r.success).toBe(false)
  })

  it('rechaza ref1Telefono inválido', () => {
    const r = paso5Schema.safeParse({ ...base, ref1Telefono: '123' })
    expect(r.success).toBe(false)
  })

  it('rechaza ref2Telefono inválido', () => {
    const r = paso5Schema.safeParse({ ...base, ref2Telefono: '9999' })
    expect(r.success).toBe(false)
  })

  it('rechaza ref1Relacion fuera del enum', () => {
    const r = paso5Schema.safeParse({ ...base, ref1Relacion: 'vecino' })
    expect(r.success).toBe(false)
  })

  it('rechaza teléfonos iguales en ambas referencias', () => {
    const r = paso5Schema.safeParse({
      ...base,
      ref1Telefono: '5512345678',
      ref2Telefono: '5512345678',
    })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(
        r.error.issues.some((i) => i.message.includes('segunda referencia no puede ser igual')),
      ).toBe(true)
    }
  })

  it('rechaza email inválido en referencia', () => {
    const r = paso5Schema.safeParse({ ...base, ref1Email: 'no-es-email' })
    expect(r.success).toBe(false)
  })

  it('rechaza ref2Relacion fuera del enum', () => {
    const r = paso5Schema.safeParse({ ...base, ref2Relacion: 'vecino' })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues[0]?.message).toBe('Selecciona una relación')
    }
  })
})
