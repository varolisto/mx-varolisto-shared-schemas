import { describe, it, expect } from "vitest"
import { paso6Schema } from "./paso6.js"

describe("paso6Schema", () => {
  it("acepta cuando ambas casillas están en true", () => {
    expect(
      paso6Schema.safeParse({
        aceptaPrivacidad: true,
        aceptaTerminos: true,
      }).success,
    ).toBe(true)
  })

  it("rechaza cuando aceptaPrivacidad es false", () => {
    expect(
      paso6Schema.safeParse({
        aceptaPrivacidad: false,
        aceptaTerminos: true,
      }).success,
    ).toBe(false)
  })

  it("rechaza cuando aceptaTerminos es false", () => {
    expect(
      paso6Schema.safeParse({
        aceptaPrivacidad: true,
        aceptaTerminos: false,
      }).success,
    ).toBe(false)
  })

  it("rechaza cuando faltan los campos", () => {
    expect(paso6Schema.safeParse({}).success).toBe(false)
  })
})
