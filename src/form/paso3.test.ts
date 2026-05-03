import { describe, it, expect } from "vitest"
import { paso3Schema } from "./paso3.js"

const validPaso3SinDeudas = {
  tipoActividad: "empleado_formal" as const,
  nombreEmpleadorNegocio: "ACME S.A. de C.V.",
  antiguedad: "mas_2" as const,
  ingresoMensual: 25000,
  tieneDeudas: "no" as const,
  cantidadDeudas: undefined,
  montoTotalDeudas: undefined,
  pagoMensualDeudas: undefined,
}

const validPaso3ConDeudas = {
  ...validPaso3SinDeudas,
  tieneDeudas: "si" as const,
  cantidadDeudas: "una_deuda" as const,
  montoTotalDeudas: "5k_15k" as const,
  pagoMensualDeudas: 1500,
}

describe("paso3Schema", () => {
  it("acepta paso3 sin deudas", () => {
    expect(paso3Schema.safeParse(validPaso3SinDeudas).success).toBe(true)
  })

  it("acepta paso3 con deudas y todos los campos completados", () => {
    expect(paso3Schema.safeParse(validPaso3ConDeudas).success).toBe(true)
  })

  it("rechaza ingreso menor a 1000", () => {
    expect(
      paso3Schema.safeParse({ ...validPaso3SinDeudas, ingresoMensual: 999 })
        .success,
    ).toBe(false)
  })

  it("rechaza tieneDeudas='si' sin cantidadDeudas", () => {
    expect(
      paso3Schema.safeParse({
        ...validPaso3ConDeudas,
        cantidadDeudas: undefined,
      }).success,
    ).toBe(false)
  })

  it("rechaza tieneDeudas='si' sin montoTotalDeudas", () => {
    expect(
      paso3Schema.safeParse({
        ...validPaso3ConDeudas,
        montoTotalDeudas: undefined,
      }).success,
    ).toBe(false)
  })

  it("rechaza tieneDeudas='si' sin pagoMensualDeudas", () => {
    expect(
      paso3Schema.safeParse({
        ...validPaso3ConDeudas,
        pagoMensualDeudas: undefined,
      }).success,
    ).toBe(false)
  })

  it("rechaza tipoActividad fuera del enum", () => {
    expect(
      paso3Schema.safeParse({
        ...validPaso3SinDeudas,
        tipoActividad: "freelancer",
      }).success,
    ).toBe(false)
  })

  it("rechaza antiguedad fuera del enum", () => {
    expect(
      paso3Schema.safeParse({
        ...validPaso3SinDeudas,
        antiguedad: "diez_años",
      }).success,
    ).toBe(false)
  })

  it("rechaza nombreEmpleadorNegocio con menos de 2 caracteres", () => {
    expect(
      paso3Schema.safeParse({
        ...validPaso3SinDeudas,
        nombreEmpleadorNegocio: "A",
      }).success,
    ).toBe(false)
  })
})
