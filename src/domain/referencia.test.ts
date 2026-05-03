import { describe, it, expect } from "vitest"
import { referenciaDomainSchema } from "./referencia.js"
import { validReferenciaDomain } from "../__fixtures__/domain.fixtures.js"

describe("referenciaDomainSchema", () => {
  it("acepta una referencia válida", () => {
    expect(referenciaDomainSchema.safeParse(validReferenciaDomain).success).toBe(true)
  })

  it("rechaza teléfono con longitud distinta de 10", () => {
    expect(
      referenciaDomainSchema.safeParse({
        ...validReferenciaDomain,
        telefono: "551234",
      }).success,
    ).toBe(false)
  })
})
