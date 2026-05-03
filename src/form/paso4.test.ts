import { describe, it, expect } from "vitest"
import { paso4Schema } from "./paso4.js"

const validPaso4 = {
  ref1Nombre: "María López",
  ref1Telefono: "8112345678",
  ref1Relacion: "familiar" as const,
  ref1Email: "maria@example.com",
  ref2Nombre: "Pedro Sánchez",
  ref2Telefono: "5598765432",
  ref2Relacion: "amigo" as const,
  ref2Email: "",
}

describe("paso4Schema", () => {
  it("acepta dos referencias válidas", () => {
    expect(paso4Schema.safeParse(validPaso4).success).toBe(true)
  })

  it("acepta ref2Email vacío (literal '')", () => {
    expect(
      paso4Schema.safeParse({ ...validPaso4, ref2Email: "" }).success,
    ).toBe(true)
  })

  it("rechaza nombre con números o símbolos (regex solo letras)", () => {
    expect(
      paso4Schema.safeParse({ ...validPaso4, ref1Nombre: "María 123" }).success,
    ).toBe(false)
  })

  it("rechaza nombre con menos de 2 caracteres", () => {
    expect(
      paso4Schema.safeParse({ ...validPaso4, ref1Nombre: "A" }).success,
    ).toBe(false)
  })

  it("rechaza teléfono inválido", () => {
    expect(
      paso4Schema.safeParse({ ...validPaso4, ref1Telefono: "1234567890" })
        .success,
    ).toBe(false)
  })

  it("rechaza relacion fuera del enum", () => {
    expect(
      paso4Schema.safeParse({ ...validPaso4, ref1Relacion: "compadre" })
        .success,
    ).toBe(false)
  })

  it("rechaza cuando ref1Telefono === ref2Telefono", () => {
    expect(
      paso4Schema.safeParse({
        ...validPaso4,
        ref2Telefono: validPaso4.ref1Telefono,
      }).success,
    ).toBe(false)
  })

  it("rechaza email inválido en ref1Email", () => {
    expect(
      paso4Schema.safeParse({ ...validPaso4, ref1Email: "no-es-email" })
        .success,
    ).toBe(false)
  })
})
