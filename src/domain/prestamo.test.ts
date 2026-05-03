import { describe, it, expect } from "vitest"
import { prestamoSchema } from "./prestamo.js"

describe("prestamoSchema (placeholder TODO)", () => {
  it("acepta un objeto vacío", () => {
    expect(prestamoSchema.safeParse({}).success).toBe(true)
  })
})
