import { describe, it, expect } from "vitest"
import { direccionDomainSchema } from "./direccion.js"
import { validDireccionDomain } from "../__fixtures__/domain.fixtures.js"

describe("direccionDomainSchema", () => {
  it("acepta una dirección válida", () => {
    expect(direccionDomainSchema.safeParse(validDireccionDomain).success).toBe(true)
  })

  it("rechaza un CP con longitud distinta de 5", () => {
    expect(
      direccionDomainSchema.safeParse({ ...validDireccionDomain, cp: "1234" }).success,
    ).toBe(false)
  })
})
