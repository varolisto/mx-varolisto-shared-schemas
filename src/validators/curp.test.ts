import { describe, it, expect } from "vitest"
import { validateCurp, isValidCurp } from "./curp.js"
import {
  VALID_CURP,
  VALID_CURP_LOWERCASE,
  VALID_CURP_WITH_SPACES,
  INVALID_CURP_TOO_SHORT,
  INVALID_CURP_TOO_LONG,
  INVALID_CURP_BAD_CHARS,
  INVALID_CURP_BAD_FORMAT,
  INVALID_CURP_BAD_DATE,
} from "../__fixtures__/curps.js"

describe("validateCurp", () => {
  it("acepta una CURP válida", () => {
    expect(validateCurp(VALID_CURP)).toEqual({ valid: true })
  })

  it("acepta una CURP en minúsculas (la normaliza a mayúsculas)", () => {
    expect(validateCurp(VALID_CURP_LOWERCASE)).toEqual({ valid: true })
  })

  it("acepta una CURP con espacios alrededor (la trimea)", () => {
    expect(validateCurp(VALID_CURP_WITH_SPACES)).toEqual({ valid: true })
  })

  it("rechaza CURP con menos de 18 caracteres", () => {
    expect(validateCurp(INVALID_CURP_TOO_SHORT)).toEqual({
      valid: false,
      reason: "longitud_incorrecta",
    })
  })

  it("rechaza CURP con más de 18 caracteres", () => {
    expect(validateCurp(INVALID_CURP_TOO_LONG)).toEqual({
      valid: false,
      reason: "longitud_incorrecta",
    })
  })

  it("rechaza CURP con caracteres no permitidos", () => {
    expect(validateCurp(INVALID_CURP_BAD_CHARS)).toEqual({
      valid: false,
      reason: "caracteres_no_permitidos",
    })
  })

  it("rechaza CURP que no cumple con el formato (segunda letra debe ser vocal)", () => {
    expect(validateCurp(INVALID_CURP_BAD_FORMAT)).toEqual({
      valid: false,
      reason: "formato_invalido",
    })
  })

  it("rechaza CURP con fecha inválida (mes 13)", () => {
    expect(validateCurp(INVALID_CURP_BAD_DATE)).toEqual({
      valid: false,
      reason: "formato_invalido",
    })
  })

  it("rechaza un valor que no es string", () => {
    expect(validateCurp(123 as unknown as string)).toEqual({
      valid: false,
      reason: "caracteres_no_permitidos",
    })
  })
})

describe("isValidCurp", () => {
  it("retorna true para CURP válida", () => {
    expect(isValidCurp(VALID_CURP)).toBe(true)
  })

  it("retorna false para CURP inválida", () => {
    expect(isValidCurp(INVALID_CURP_BAD_FORMAT)).toBe(false)
  })
})
