import { describe, it, expect } from "vitest"
import { rechazarRequestSchema } from "./rechazar.js"

describe("rechazarRequestSchema", () => {
  it("acepta motivo válido y nota_operador en rango", () => {
    expect(
      rechazarRequestSchema.safeParse({
        motivo: "score_insuficiente",
        nota_operador: "Cliente con score de 35 puntos, debajo del umbral.",
      }).success,
    ).toBe(true)
  })

  it("rechaza nota_operador con menos de 10 caracteres", () => {
    expect(
      rechazarRequestSchema.safeParse({
        motivo: "score_insuficiente",
        nota_operador: "Corta",
      }).success,
    ).toBe(false)
  })

  it("rechaza un motivo fuera del enum MOTIVO_RECHAZO", () => {
    expect(
      rechazarRequestSchema.safeParse({
        motivo: "no_cumple_requisitos",
        nota_operador: "Una nota suficientemente larga para pasar.",
      }).success,
    ).toBe(false)
  })
})
