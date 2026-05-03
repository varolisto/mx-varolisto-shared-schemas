import { describe, it, expect } from "vitest"
import { marcarInfoRecibidaRequestSchema } from "./marcar-info-recibida.js"

describe("marcarInfoRecibidaRequestSchema (strict empty object)", () => {
  it("acepta un objeto vacío", () => {
    expect(marcarInfoRecibidaRequestSchema.safeParse({}).success).toBe(true)
  })

  it("rechaza propiedades adicionales (strict)", () => {
    expect(
      marcarInfoRecibidaRequestSchema.safeParse({ extra: true }).success,
    ).toBe(false)
  })
})
