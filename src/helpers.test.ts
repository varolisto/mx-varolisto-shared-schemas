import { describe, expect, it } from 'vitest'
import { SEXO } from './enums/sexo.js'
import { enumSelecciona, uuidSchema, zStr } from './helpers.js'

describe('zStr', () => {
  it('acepta un string no vacío', () => {
    const schema = zStr()
    expect(schema.parse('hola')).toBe('hola')
  })

  it('trimea espacios alrededor', () => {
    const schema = zStr()
    expect(schema.parse('  hola  ')).toBe('hola')
  })

  it('rechaza string vacío con mensaje default', () => {
    const schema = zStr()
    const result = schema.safeParse('')
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Campo requerido')
    }
  })

  it('rechaza string de solo espacios con mensaje custom', () => {
    const schema = zStr('Selecciona una opción')
    const result = schema.safeParse('   ')
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Selecciona una opción')
    }
  })

  it('usa el mensaje custom cuando el valor no es string', () => {
    const schema = zStr('Selecciona una opción')
    const result = schema.safeParse(undefined)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Selecciona una opción')
    }
  })
})

describe('enumSelecciona', () => {
  it('acepta valor válido del enum', () => {
    const schema = enumSelecciona(SEXO)
    expect(schema.parse('M')).toBe('M')
  })

  it('rechaza valor fuera del enum con mensaje "Selecciona una opción"', () => {
    const schema = enumSelecciona(SEXO)
    const result = schema.safeParse('Z')
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Selecciona una opción')
    }
  })

  it('rechaza undefined con mensaje "Selecciona una opción"', () => {
    const schema = enumSelecciona(SEXO)
    const result = schema.safeParse(undefined)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('Selecciona una opción')
    }
  })
})

describe('uuidSchema', () => {
  it('acepta un UUID v4 válido', () => {
    expect(uuidSchema.parse('550e8400-e29b-41d4-a716-446655440000')).toBe(
      '550e8400-e29b-41d4-a716-446655440000',
    )
  })

  it('rechaza un string que no es UUID', () => {
    const result = uuidSchema.safeParse('no-es-uuid')
    expect(result.success).toBe(false)
  })

  it('rechaza string vacío', () => {
    const result = uuidSchema.safeParse('')
    expect(result.success).toBe(false)
  })
})
