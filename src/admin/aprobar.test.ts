import { describe, it, expect } from "vitest"
import { aprobarRequestSchema } from "./aprobar.js"

describe("aprobarRequestSchema (alias de calcularPropuestaRequestSchema)", () => {
  it("acepta payload con monto y plazo dentro de rango", () => {
    expect(
      aprobarRequestSchema.safeParse({
        monto_aprobado: 10000,
        plazo_aprobado: 4,
      }).success,
    ).toBe(true)
  })

  it("rechaza monto fuera del rango 2000-20000", () => {
    expect(
      aprobarRequestSchema.safeParse({
        monto_aprobado: 25000,
        plazo_aprobado: 4,
      }).success,
    ).toBe(false)
  })

  it("rechaza plazo fuera del rango 2-6", () => {
    expect(
      aprobarRequestSchema.safeParse({
        monto_aprobado: 10000,
        plazo_aprobado: 12,
      }).success,
    ).toBe(false)
  })
})
