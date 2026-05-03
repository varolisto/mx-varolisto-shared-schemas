import { describe, expect, it } from 'vitest'
import {
  INVALID_CLABE_BAD_CONTROL,
  INVALID_CLABE_EMPTY,
  INVALID_CLABE_NON_NUMERIC,
  INVALID_CLABE_TOO_LONG,
  INVALID_CLABE_TOO_SHORT,
  VALID_CLABE_BBVA,
  VALID_CLABE_STP,
} from '../__fixtures__/clabes.js'
import { getBancoFromClabe, validateClabe } from './clabe.js'

describe('validateClabe', () => {
  it('acepta una CLABE válida con dígito de control correcto (STP)', () => {
    expect(validateClabe(VALID_CLABE_STP)).toBe(true)
  })

  it('acepta una CLABE válida construida con el algoritmo Banxico (BBVA)', () => {
    expect(validateClabe(VALID_CLABE_BBVA)).toBe(true)
  })

  it('rechaza una CLABE con dígito de control inválido', () => {
    expect(validateClabe(INVALID_CLABE_BAD_CONTROL)).toBe(false)
  })

  it('rechaza una CLABE de 17 dígitos (corta)', () => {
    expect(validateClabe(INVALID_CLABE_TOO_SHORT)).toBe(false)
  })

  it('rechaza una CLABE de 19 dígitos (larga)', () => {
    expect(validateClabe(INVALID_CLABE_TOO_LONG)).toBe(false)
  })

  it('rechaza una CLABE con caracteres no numéricos', () => {
    expect(validateClabe(INVALID_CLABE_NON_NUMERIC)).toBe(false)
  })

  it('rechaza una CLABE vacía', () => {
    expect(validateClabe(INVALID_CLABE_EMPTY)).toBe(false)
  })

  it('rechaza una CLABE con espacios intermedios', () => {
    expect(validateClabe('6461 80157000000004')).toBe(false)
  })
})

describe('getBancoFromClabe', () => {
  it('retorna BBVA para una CLABE que empieza con 012', () => {
    expect(getBancoFromClabe('012180001234567899')).toBe('BBVA')
  })

  it('retorna Santander para una CLABE que empieza con 014', () => {
    expect(getBancoFromClabe('014000000000000000')).toBe('Santander')
  })

  it('retorna STP para una CLABE que empieza con 646', () => {
    expect(getBancoFromClabe(VALID_CLABE_STP)).toBe('STP')
  })

  it('retorna Banamex para una CLABE que empieza con 002', () => {
    expect(getBancoFromClabe('002000000000000000')).toBe('Banamex')
  })

  it("retorna 'Banco desconocido' cuando el código de banco no existe", () => {
    expect(getBancoFromClabe('999000000000000000')).toBe('Banco desconocido')
  })
})
