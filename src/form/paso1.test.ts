import { describe, it, expect } from "vitest"
import { paso1Schema } from "./paso1.js"
import { validSolicitudCompleta } from "../__fixtures__/solicitud.fixture.js"
import { INVALID_CURP_BAD_FORMAT } from "../__fixtures__/curps.js"

const validPaso1 = {
  nombre: validSolicitudCompleta.nombre,
  apellidoPaterno: validSolicitudCompleta.apellidoPaterno,
  apellidoMaterno: validSolicitudCompleta.apellidoMaterno,
  sexo: validSolicitudCompleta.sexo,
  fechaNacimiento: validSolicitudCompleta.fechaNacimiento,
  curp: validSolicitudCompleta.curp,
  email: validSolicitudCompleta.email,
  rfc: validSolicitudCompleta.rfc,
  telefono: validSolicitudCompleta.telefono,
  codigoPostal: validSolicitudCompleta.codigoPostal,
  colonia: validSolicitudCompleta.colonia,
  municipio: validSolicitudCompleta.municipio,
  calle: validSolicitudCompleta.calle,
  numeroExterior: validSolicitudCompleta.numeroExterior,
  numeroInterior: validSolicitudCompleta.numeroInterior,
}

describe("paso1Schema", () => {
  it("acepta un paso1 con todos los campos válidos", () => {
    expect(paso1Schema.safeParse(validPaso1).success).toBe(true)
  })

  it("acepta un paso1 sin numeroInterior (es opcional)", () => {
    const { numeroInterior, ...sinInterior } = validPaso1
    void numeroInterior
    expect(paso1Schema.safeParse(sinInterior).success).toBe(true)
  })

  it("acepta un paso1 sin RFC (es opcional)", () => {
    const { rfc, ...sinRfc } = validPaso1
    void rfc
    expect(paso1Schema.safeParse(sinRfc).success).toBe(true)
  })

  it("rechaza un nombre con menos de 2 caracteres", () => {
    const result = paso1Schema.safeParse({ ...validPaso1, nombre: "A" })
    expect(result.success).toBe(false)
  })

  it("rechaza una CURP con formato inválido", () => {
    const result = paso1Schema.safeParse({
      ...validPaso1,
      curp: INVALID_CURP_BAD_FORMAT,
    })
    expect(result.success).toBe(false)
  })

  it("rechaza una CURP con longitud distinta de 18", () => {
    const result = paso1Schema.safeParse({
      ...validPaso1,
      curp: "MARJ800101HDFRRR0",
    })
    expect(result.success).toBe(false)
  })

  it("rechaza un código postal que no son 5 dígitos", () => {
    const result = paso1Schema.safeParse({
      ...validPaso1,
      codigoPostal: "1234",
    })
    expect(result.success).toBe(false)
  })

  it("rechaza un código postal no numérico", () => {
    const result = paso1Schema.safeParse({
      ...validPaso1,
      codigoPostal: "ABCDE",
    })
    expect(result.success).toBe(false)
  })

  it("rechaza un email inválido", () => {
    const result = paso1Schema.safeParse({
      ...validPaso1,
      email: "no-es-email",
    })
    expect(result.success).toBe(false)
  })

  it("rechaza un teléfono inválido", () => {
    const result = paso1Schema.safeParse({
      ...validPaso1,
      telefono: "1234567890",
    })
    expect(result.success).toBe(false)
  })

  it("rechaza una fecha de nacimiento con formato distinto de YYYY-MM-DD", () => {
    const result = paso1Schema.safeParse({
      ...validPaso1,
      fechaNacimiento: "01/01/1990",
    })
    expect(result.success).toBe(false)
  })

  it("rechaza un menor de 18 años (fecha reciente)", () => {
    const today = new Date()
    const fechaMenor = `${today.getFullYear() - 10}-01-01`
    const result = paso1Schema.safeParse({
      ...validPaso1,
      fechaNacimiento: fechaMenor,
    })
    expect(result.success).toBe(false)
  })

  it("rechaza un sexo fuera del enum", () => {
    const result = paso1Schema.safeParse({
      ...validPaso1,
      sexo: "Z",
    })
    expect(result.success).toBe(false)
  })

  it("rechaza cuando falta numeroExterior", () => {
    const result = paso1Schema.safeParse({
      ...validPaso1,
      numeroExterior: "",
    })
    expect(result.success).toBe(false)
  })
})
