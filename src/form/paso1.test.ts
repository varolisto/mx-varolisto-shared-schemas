import { describe, expect, it } from 'vitest'
import { paso1Schema } from './paso1.js'

const base = {
  nombre: 'Juan',
  apellidoPaterno: 'Pérez',
  apellidoMaterno: 'García',
  sexo: 'M' as const,
  fechaNacimiento: '1990-06-15',
  curp: 'PERJ900615HDFRZN08',
  email: 'juan@example.com',
  telefono: '5512345678',
}

describe('paso1Schema', () => {
  it('acepta datos personales válidos', () => {
    expect(paso1Schema.safeParse(base).success).toBe(true)
  })

  it('acepta sin RFC (campo opcional)', () => {
    expect(paso1Schema.safeParse({ ...base, rfc: undefined }).success).toBe(true)
  })

  it('acepta RFC persona física válido', () => {
    expect(paso1Schema.safeParse({ ...base, rfc: 'PERJ900615ABC' }).success).toBe(true)
  })

  it('rechaza nombre con menos de 2 caracteres', () => {
    const r = paso1Schema.safeParse({ ...base, nombre: 'J' })
    expect(r.success).toBe(false)
  })

  it('rechaza apellidoPaterno con menos de 2 caracteres', () => {
    const r = paso1Schema.safeParse({ ...base, apellidoPaterno: 'P' })
    expect(r.success).toBe(false)
  })

  it('rechaza sexo con valor fuera del enum', () => {
    const r = paso1Schema.safeParse({ ...base, sexo: 'Z' })
    expect(r.success).toBe(false)
  })

  it('rechaza fechaNacimiento con formato inválido', () => {
    const r = paso1Schema.safeParse({ ...base, fechaNacimiento: '15/06/1990' })
    expect(r.success).toBe(false)
  })

  it('rechaza persona menor de 18 años', () => {
    const birth = new Date()
    birth.setFullYear(birth.getFullYear() - 17)
    const fechaNacimiento = birth.toISOString().slice(0, 10)
    const r = paso1Schema.safeParse({ ...base, fechaNacimiento })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues[0]?.message).toBe('Debes tener al menos 18 años')
    }
  })

  it('rechaza persona mayor de 100 años', () => {
    const birth = new Date()
    birth.setFullYear(birth.getFullYear() - 101)
    const fechaNacimiento = birth.toISOString().slice(0, 10)
    const r = paso1Schema.safeParse({ ...base, fechaNacimiento })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues[0]?.message).toBe('Fecha de nacimiento inválida')
    }
  })

  it('rechaza CURP inválida', () => {
    const r = paso1Schema.safeParse({ ...base, curp: 'INVALIDA1234567890' })
    expect(r.success).toBe(false)
  })

  it('rechaza email con formato inválido', () => {
    const r = paso1Schema.safeParse({ ...base, email: 'no-es-email' })
    expect(r.success).toBe(false)
  })

  it('rechaza RFC con longitud distinta a 12 o 13', () => {
    const r = paso1Schema.safeParse({ ...base, rfc: 'CORTO' })
    expect(r.success).toBe(false)
  })

  it('rechaza teléfono con formato inválido', () => {
    const r = paso1Schema.safeParse({ ...base, telefono: '123' })
    expect(r.success).toBe(false)
  })
})
