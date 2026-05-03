import { describe, expect, it } from 'vitest'
import { paso3Schema } from './paso3.js'

const base = {
  codigoPostal: '06600',
  colonia: 'Roma Norte',
  municipio: 'Cuauhtémoc',
  estado: 'Ciudad de México',
  calle: 'Av. Insurgentes',
  numeroExterior: '123',
  aniosViviendo: 'mas_de_5' as const,
  tipoVivienda: 'propia' as const,
}

describe('paso3Schema', () => {
  it('acepta datos de dirección válidos', () => {
    expect(paso3Schema.safeParse(base).success).toBe(true)
  })

  it('acepta ciudad y numeroInterior opcionales', () => {
    const r = paso3Schema.safeParse({
      ...base,
      ciudad: 'CDMX',
      numeroInterior: 'Depto 4B',
    })
    expect(r.success).toBe(true)
  })

  it('acepta sin ciudad ni numeroInterior', () => {
    expect(
      paso3Schema.safeParse({ ...base, ciudad: undefined, numeroInterior: undefined }).success,
    ).toBe(true)
  })

  it('rechaza codigoPostal con formato inválido (letras)', () => {
    const r = paso3Schema.safeParse({ ...base, codigoPostal: 'ABCDE' })
    expect(r.success).toBe(false)
  })

  it('rechaza codigoPostal con menos de 5 dígitos', () => {
    const r = paso3Schema.safeParse({ ...base, codigoPostal: '1234' })
    expect(r.success).toBe(false)
  })

  it('rechaza municipio vacío', () => {
    const r = paso3Schema.safeParse({ ...base, municipio: '' })
    expect(r.success).toBe(false)
  })

  it('rechaza estado vacío', () => {
    const r = paso3Schema.safeParse({ ...base, estado: '' })
    expect(r.success).toBe(false)
  })

  it('rechaza calle con menos de 2 caracteres', () => {
    const r = paso3Schema.safeParse({ ...base, calle: 'X' })
    expect(r.success).toBe(false)
  })

  it('rechaza numeroExterior vacío', () => {
    const r = paso3Schema.safeParse({ ...base, numeroExterior: '' })
    expect(r.success).toBe(false)
  })

  it('rechaza aniosViviendo fuera del enum', () => {
    const r = paso3Schema.safeParse({ ...base, aniosViviendo: 'diez_anos' })
    expect(r.success).toBe(false)
  })

  it('rechaza tipoVivienda fuera del enum', () => {
    const r = paso3Schema.safeParse({ ...base, tipoVivienda: 'hipotecada' })
    expect(r.success).toBe(false)
  })
})
