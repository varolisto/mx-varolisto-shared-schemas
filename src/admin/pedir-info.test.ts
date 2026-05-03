import { describe, it, expect } from "vitest"
import { pedirInfoRequestSchema } from "./pedir-info.js"

describe("pedirInfoRequestSchema", () => {
  it("acepta mensaje válido", () => {
    expect(
      pedirInfoRequestSchema.safeParse({
        mensaje_para_operador:
          "Hola, ¿podrían enviarme un comprobante de domicilio actualizado?",
      }).success,
    ).toBe(true)
  })

  it("rechaza mensaje con menos de 10 caracteres", () => {
    expect(
      pedirInfoRequestSchema.safeParse({
        mensaje_para_operador: "Falta",
      }).success,
    ).toBe(false)
  })

  it("rechaza mensaje con más de 1000 caracteres", () => {
    expect(
      pedirInfoRequestSchema.safeParse({
        mensaje_para_operador: "x".repeat(1001),
      }).success,
    ).toBe(false)
  })
})
