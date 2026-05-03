import { describe, expect, it } from 'vitest'
import {
  INVALID_RFC_BAD_CHARS,
  INVALID_RFC_BAD_DATE,
  INVALID_RFC_TOO_LONG,
  INVALID_RFC_TOO_SHORT,
  VALID_RFC_LOWERCASE,
  VALID_RFC_PERSONA_FISICA,
  VALID_RFC_PERSONA_MORAL,
  VALID_RFC_WITH_SPACES,
} from '../__fixtures__/rfcs.js'
import { isValidRfc, validateRfc } from './rfc.js'

describe('validateRfc', () => {
  it('acepta un RFC de persona física válido (13 chars)', () => {
    expect(validateRfc(VALID_RFC_PERSONA_FISICA)).toEqual({
      valid: true,
      tipo: 'persona_fisica',
    })
  })

  it('acepta un RFC de persona moral válido (12 chars)', () => {
    expect(validateRfc(VALID_RFC_PERSONA_MORAL)).toEqual({
      valid: true,
      tipo: 'persona_moral',
    })
  })

  it('acepta un RFC en minúsculas (lo normaliza)', () => {
    expect(validateRfc(VALID_RFC_LOWERCASE)).toEqual({
      valid: true,
      tipo: 'persona_fisica',
    })
  })

  it('acepta un RFC con espacios alrededor (lo trimea)', () => {
    expect(validateRfc(VALID_RFC_WITH_SPACES)).toEqual({
      valid: true,
      tipo: 'persona_fisica',
    })
  })

  it('rechaza un RFC con longitud menor a 12', () => {
    expect(validateRfc(INVALID_RFC_TOO_SHORT)).toEqual({
      valid: false,
      reason: 'longitud_incorrecta',
    })
  })

  it('rechaza un RFC con longitud mayor a 13', () => {
    expect(validateRfc(INVALID_RFC_TOO_LONG)).toEqual({
      valid: false,
      reason: 'longitud_incorrecta',
    })
  })

  it('rechaza un RFC con caracteres no permitidos', () => {
    expect(validateRfc(INVALID_RFC_BAD_CHARS)).toEqual({
      valid: false,
      reason: 'caracteres_no_permitidos',
    })
  })

  it('rechaza un RFC con fecha inválida en la homoclave', () => {
    expect(validateRfc(INVALID_RFC_BAD_DATE)).toEqual({
      valid: false,
      reason: 'formato_invalido',
    })
  })

  it('rechaza un valor que no es string', () => {
    expect(validateRfc(undefined as unknown as string)).toEqual({
      valid: false,
      reason: 'caracteres_no_permitidos',
    })
  })
})

describe('isValidRfc', () => {
  it('retorna true para RFC persona física válido', () => {
    expect(isValidRfc(VALID_RFC_PERSONA_FISICA)).toBe(true)
  })

  it('retorna true para RFC persona moral válido', () => {
    expect(isValidRfc(VALID_RFC_PERSONA_MORAL)).toBe(true)
  })

  it('retorna false para RFC inválido', () => {
    expect(isValidRfc(INVALID_RFC_TOO_SHORT)).toBe(false)
  })
})
