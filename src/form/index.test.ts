import { describe, expect, it } from 'vitest'
import { validSolicitudCompleta } from '../__fixtures__/solicitud.fixture.js'
import { solicitudSchema } from './index.js'

describe('solicitudSchema', () => {
  it('acepta la solicitud completa válida', () => {
    expect(solicitudSchema.safeParse(validSolicitudCompleta).success).toBe(true)
  })

  it('rechaza cuando falta un campo de paso2', () => {
    const { montoSolicitado: _, ...sinMonto } = validSolicitudCompleta
    const r = solicitudSchema.safeParse(sinMonto)
    expect(r.success).toBe(false)
  })

  it('rechaza cuando el paso6 falla (INE sin reverso)', () => {
    const r = solicitudSchema.safeParse({
      ...validSolicitudCompleta,
      archivosDeclarados: [
        {
          tipoArchivo: 'ine_frente',
          nombreOriginal: 'ine-frente.jpg',
          mimeType: 'image/jpeg',
          tamanoBytes: 524288,
        },
      ],
    })
    expect(r.success).toBe(false)
  })

  it('rechaza cuando el paso7 falla (privacidad no aceptada)', () => {
    const r = solicitudSchema.safeParse({
      ...validSolicitudCompleta,
      aceptaPrivacidad: false,
    })
    expect(r.success).toBe(false)
  })

  it('rechaza cuando las referencias tienen el mismo teléfono', () => {
    const r = solicitudSchema.safeParse({
      ...validSolicitudCompleta,
      ref2Telefono: validSolicitudCompleta.ref1Telefono,
    })
    expect(r.success).toBe(false)
  })
})
