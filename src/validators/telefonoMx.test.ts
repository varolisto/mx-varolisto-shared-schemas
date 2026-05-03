import { describe, expect, it } from 'vitest'
import {
  INVALID_TELEFONO_NON_NUMERIC,
  INVALID_TELEFONO_STARTS_WITH_0,
  INVALID_TELEFONO_STARTS_WITH_1,
  INVALID_TELEFONO_TOO_LONG,
  INVALID_TELEFONO_TOO_SHORT,
  INVALID_TELEFONO_WITH_LADA_52,
  VALID_TELEFONO,
  VALID_TELEFONO_FORMATTED,
  VALID_TELEFONO_OTHER,
} from '../__fixtures__/telefonos.js'
import { isValidTelefonoMx, validateTelefonoMx } from './telefonoMx.js'

describe('validateTelefonoMx', () => {
  it('acepta un teléfono de 10 dígitos válido', () => {
    expect(validateTelefonoMx(VALID_TELEFONO)).toEqual({
      valid: true,
      normalized: VALID_TELEFONO,
    })
  })

  it('acepta otro teléfono válido con primer dígito 8', () => {
    expect(validateTelefonoMx(VALID_TELEFONO_OTHER)).toEqual({
      valid: true,
      normalized: VALID_TELEFONO_OTHER,
    })
  })

  it('acepta un teléfono con formato (paréntesis, guiones, espacios) y lo normaliza', () => {
    expect(validateTelefonoMx(VALID_TELEFONO_FORMATTED)).toEqual({
      valid: true,
      normalized: '5512345678',
    })
  })

  it('rechaza un teléfono con lada 52 + (queda en 12 dígitos)', () => {
    expect(validateTelefonoMx(INVALID_TELEFONO_WITH_LADA_52)).toEqual({
      valid: false,
      reason: 'longitud_incorrecta',
    })
  })

  it('rechaza un teléfono que empieza con 1', () => {
    expect(validateTelefonoMx(INVALID_TELEFONO_STARTS_WITH_1)).toEqual({
      valid: false,
      reason: 'formato_invalido',
    })
  })

  it('rechaza un teléfono que empieza con 0', () => {
    expect(validateTelefonoMx(INVALID_TELEFONO_STARTS_WITH_0)).toEqual({
      valid: false,
      reason: 'formato_invalido',
    })
  })

  it('rechaza un teléfono de 9 dígitos', () => {
    expect(validateTelefonoMx(INVALID_TELEFONO_TOO_SHORT)).toEqual({
      valid: false,
      reason: 'longitud_incorrecta',
    })
  })

  it('rechaza un teléfono de 11 dígitos', () => {
    expect(validateTelefonoMx(INVALID_TELEFONO_TOO_LONG)).toEqual({
      valid: false,
      reason: 'longitud_incorrecta',
    })
  })

  it('rechaza un teléfono con caracteres no numéricos', () => {
    expect(validateTelefonoMx(INVALID_TELEFONO_NON_NUMERIC)).toEqual({
      valid: false,
      reason: 'formato_invalido',
    })
  })

  it('rechaza un valor que no es string', () => {
    expect(validateTelefonoMx(5512345678 as unknown as string)).toEqual({
      valid: false,
      reason: 'tipo_incorrecto',
    })
  })
})

describe('isValidTelefonoMx', () => {
  it('retorna true para teléfono válido', () => {
    expect(isValidTelefonoMx(VALID_TELEFONO)).toBe(true)
  })

  it('retorna false para teléfono inválido', () => {
    expect(isValidTelefonoMx(INVALID_TELEFONO_STARTS_WITH_1)).toBe(false)
  })
})
