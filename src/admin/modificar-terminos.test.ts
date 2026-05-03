import { describe, it, expect } from "vitest"
import { modificarTerminosRequestSchema } from "./modificar-terminos.js"

describe("modificarTerminosRequestSchema (alias de calcularPropuestaRequestSchema)", () => {
  it("acepta payload válido", () => {
    expect(
      modificarTerminosRequestSchema.safeParse({
        monto_aprobado: 8000,
        plazo_aprobado: 3,
      }).success,
    ).toBe(true)
  })

  it("rechaza monto < 2000", () => {
    expect(
      modificarTerminosRequestSchema.safeParse({
        monto_aprobado: 1000,
        plazo_aprobado: 3,
      }).success,
    ).toBe(false)
  })
})
