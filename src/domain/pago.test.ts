import { describe, it, expect } from "vitest"
import { pagoSchema } from "./pago.js"

describe("pagoSchema (placeholder TODO)", () => {
  it("acepta un objeto vacío", () => {
    expect(pagoSchema.safeParse({}).success).toBe(true)
  })
})
