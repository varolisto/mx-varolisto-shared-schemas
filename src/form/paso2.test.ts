import { describe, it, expect } from "vitest"
import { paso2Schema } from "./paso2.js"

const validPaso2 = {
  montoSolicitado: 10000,
  plazoMeses: "4" as const,
  primerCredito: "si" as const,
  destinoPrestamo: "capital_trabajo" as const,
  destinoOtro: undefined,
}

describe("paso2Schema", () => {
  it("acepta un paso2 válido", () => {
    expect(paso2Schema.safeParse(validPaso2).success).toBe(true)
  })

  it("rechaza monto menor a 2000", () => {
    expect(
      paso2Schema.safeParse({ ...validPaso2, montoSolicitado: 1999 }).success,
    ).toBe(false)
  })

  it("rechaza monto mayor a 20000", () => {
    expect(
      paso2Schema.safeParse({ ...validPaso2, montoSolicitado: 20001 }).success,
    ).toBe(false)
  })

  it("acepta monto en los límites (2000 y 20000)", () => {
    expect(
      paso2Schema.safeParse({ ...validPaso2, montoSolicitado: 2000 }).success,
    ).toBe(true)
    expect(
      paso2Schema.safeParse({ ...validPaso2, montoSolicitado: 20000 }).success,
    ).toBe(true)
  })

  it("rechaza un plazo fuera del enum", () => {
    expect(
      paso2Schema.safeParse({ ...validPaso2, plazoMeses: "12" }).success,
    ).toBe(false)
  })

  it("rechaza un destinoPrestamo fuera del enum", () => {
    expect(
      paso2Schema.safeParse({
        ...validPaso2,
        destinoPrestamo: "vacaciones",
      }).success,
    ).toBe(false)
  })

  it("rechaza destinoPrestamo='otro' sin destinoOtro", () => {
    expect(
      paso2Schema.safeParse({
        ...validPaso2,
        destinoPrestamo: "otro",
        destinoOtro: undefined,
      }).success,
    ).toBe(false)
  })

  it("acepta destinoPrestamo='otro' con destinoOtro descrito", () => {
    expect(
      paso2Schema.safeParse({
        ...validPaso2,
        destinoPrestamo: "otro",
        destinoOtro: "Compra de herramienta especial",
      }).success,
    ).toBe(true)
  })

  it("rechaza primerCredito fuera de [si, no]", () => {
    expect(
      paso2Schema.safeParse({ ...validPaso2, primerCredito: "tal_vez" })
        .success,
    ).toBe(false)
  })
})
