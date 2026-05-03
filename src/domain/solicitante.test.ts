import { describe, it, expect } from "vitest"
import { solicitanteDomainSchema } from "./solicitante.js"
import { validSolicitanteDomain } from "../__fixtures__/domain.fixtures.js"

describe("solicitanteDomainSchema", () => {
  it("acepta un solicitante válido", () => {
    expect(solicitanteDomainSchema.safeParse(validSolicitanteDomain).success).toBe(true)
  })

  it("rechaza CURP con longitud distinta de 18", () => {
    expect(
      solicitanteDomainSchema.safeParse({ ...validSolicitanteDomain, curp: "CORTA" })
        .success,
    ).toBe(false)
  })

  it("acepta apellidoMaterno null", () => {
    expect(
      solicitanteDomainSchema.safeParse({
        ...validSolicitanteDomain,
        apellidoMaterno: null,
      }).success,
    ).toBe(true)
  })
})
