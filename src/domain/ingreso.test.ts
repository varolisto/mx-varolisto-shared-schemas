import { describe, it, expect } from "vitest"
import { ingresoDomainSchema } from "./ingreso.js"
import { validIngresoDomain } from "../__fixtures__/domain.fixtures.js"

describe("ingresoDomainSchema", () => {
  it("acepta un ingreso válido", () => {
    expect(ingresoDomainSchema.safeParse(validIngresoDomain).success).toBe(true)
  })

  it("rechaza antiguedadMeses negativo", () => {
    expect(
      ingresoDomainSchema.safeParse({
        ...validIngresoDomain,
        antiguedadMeses: -1,
      }).success,
    ).toBe(false)
  })
})
