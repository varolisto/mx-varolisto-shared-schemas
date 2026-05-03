import { describe, it, expect } from "vitest"
import { cancelarRequestSchema } from "./cancelar.js"

describe("cancelarRequestSchema", () => {
  it("acepta motivo válido y nota_operador en rango", () => {
    expect(
      cancelarRequestSchema.safeParse({
        motivo: "cliente_no_responde",
        nota_operador: "Sin respuesta tras 3 intentos en 5 días.",
      }).success,
    ).toBe(true)
  })

  it("rechaza un motivo fuera del enum MOTIVO_CANCELACION", () => {
    expect(
      cancelarRequestSchema.safeParse({
        motivo: "score_insuficiente",
        nota_operador: "Una nota suficientemente larga.",
      }).success,
    ).toBe(false)
  })
})
