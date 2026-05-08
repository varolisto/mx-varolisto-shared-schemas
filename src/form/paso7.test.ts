import { describe, expect, it } from 'vitest'
import { paso7Schema } from './paso7.js'

describe('paso7Schema', () => {
  it('acepta ambos consentimientos en true', () => {
    expect(paso7Schema.safeParse({ aceptaPrivacidad: true, aceptaTerminos: true }).success).toBe(
      true,
    )
  })

  it('rechaza aceptaPrivacidad en false', () => {
    const r = paso7Schema.safeParse({ aceptaPrivacidad: false, aceptaTerminos: true })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues[0]?.message).toBe('Necesitamos tu autorización para continuar')
    }
  })

  it('rechaza aceptaTerminos en false', () => {
    const r = paso7Schema.safeParse({ aceptaPrivacidad: true, aceptaTerminos: false })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues[0]?.message).toBe('Necesitamos que aceptes los términos para continuar')
    }
  })

  it('rechaza aceptaPrivacidad ausente', () => {
    const r = paso7Schema.safeParse({ aceptaTerminos: true })
    expect(r.success).toBe(false)
  })

  it('rechaza aceptaTerminos ausente', () => {
    const r = paso7Schema.safeParse({ aceptaPrivacidad: true })
    expect(r.success).toBe(false)
  })
})
