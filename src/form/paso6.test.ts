import { describe, expect, it } from 'vitest'
import { archivoDeclaradoSchema, paso6Schema } from './paso6.js'

const archivoIneFrente = {
  tipoArchivo: 'ine_frente' as const,
  nombreOriginal: 'ine-frente.jpg',
  mimeType: 'image/jpeg',
  tamanoBytes: 524288,
}

const archivoIneReverso = {
  tipoArchivo: 'ine_reverso' as const,
  nombreOriginal: 'ine-reverso.jpg',
  mimeType: 'image/jpeg',
  tamanoBytes: 491520,
}

const archivoPasaporte = {
  tipoArchivo: 'pasaporte_principal' as const,
  nombreOriginal: 'pasaporte.jpg',
  mimeType: 'image/jpeg',
  tamanoBytes: 800000,
}

const SESSION_UUID = '550e8400-e29b-41d4-a716-446655440000'

const baseIne = {
  sessionUuid: SESSION_UUID,
  tipoIdentificacion: 'ine' as const,
  archivosDeclarados: [archivoIneFrente, archivoIneReverso],
}

describe('archivoDeclaradoSchema', () => {
  it('acepta archivo válido', () => {
    expect(archivoDeclaradoSchema.safeParse(archivoIneFrente).success).toBe(true)
  })

  it('rechaza tamanoBytes de 0', () => {
    const r = archivoDeclaradoSchema.safeParse({ ...archivoIneFrente, tamanoBytes: 0 })
    expect(r.success).toBe(false)
  })

  it('rechaza tamanoBytes negativo', () => {
    const r = archivoDeclaradoSchema.safeParse({ ...archivoIneFrente, tamanoBytes: -1 })
    expect(r.success).toBe(false)
  })

  it('rechaza tipoArchivo fuera del enum', () => {
    const r = archivoDeclaradoSchema.safeParse({ ...archivoIneFrente, tipoArchivo: 'selfie' })
    expect(r.success).toBe(false)
  })
})

describe('paso6Schema', () => {
  it('acepta INE con frente y reverso', () => {
    expect(paso6Schema.safeParse(baseIne).success).toBe(true)
  })

  it('acepta pasaporte con archivo principal', () => {
    const r = paso6Schema.safeParse({
      sessionUuid: SESSION_UUID,
      tipoIdentificacion: 'pasaporte',
      archivosDeclarados: [archivoPasaporte],
    })
    expect(r.success).toBe(true)
  })

  it('rechaza INE sin ine_reverso', () => {
    const r = paso6Schema.safeParse({
      ...baseIne,
      archivosDeclarados: [archivoIneFrente],
    })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues.some((i) => i.message.includes('identificación oficial'))).toBe(true)
    }
  })

  it('rechaza INE sin ine_frente', () => {
    const r = paso6Schema.safeParse({
      ...baseIne,
      archivosDeclarados: [archivoIneReverso],
    })
    expect(r.success).toBe(false)
  })

  it('rechaza pasaporte sin pasaporte_principal', () => {
    const r = paso6Schema.safeParse({
      sessionUuid: SESSION_UUID,
      tipoIdentificacion: 'pasaporte',
      archivosDeclarados: [archivoIneFrente],
    })
    expect(r.success).toBe(false)
  })

  it('rechaza sin archivos', () => {
    const r = paso6Schema.safeParse({ ...baseIne, archivosDeclarados: [] })
    expect(r.success).toBe(false)
  })

  it('rechaza más de 7 archivos', () => {
    const muchos = Array.from({ length: 8 }, (_, i) => ({
      ...archivoIneFrente,
      tipoArchivo: 'comprobante_ingreso' as const,
      nombreOriginal: `archivo${i}.jpg`,
    }))
    const r = paso6Schema.safeParse({ ...baseIne, archivosDeclarados: muchos })
    expect(r.success).toBe(false)
  })

  it('rechaza sessionUuid con formato inválido', () => {
    const r = paso6Schema.safeParse({ ...baseIne, sessionUuid: 'no-es-uuid' })
    expect(r.success).toBe(false)
  })

  it('rechaza tipoIdentificacion fuera del enum', () => {
    const r = paso6Schema.safeParse({ ...baseIne, tipoIdentificacion: 'licencia' })
    expect(r.success).toBe(false)
  })
})
