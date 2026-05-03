import { describe, it, expect } from "vitest"
import { solicitudDomainSchema } from "./solicitud.js"
import { validSolicitudDomain } from "../__fixtures__/domain.fixtures.js"

describe("solicitudDomainSchema", () => {
  it("acepta una solicitud válida", () => {
    expect(solicitudDomainSchema.safeParse(validSolicitudDomain).success).toBe(true)
  })

  it("aplica default 'recibida' cuando no se pasa estado", () => {
    const { estado, ...sinEstado } = validSolicitudDomain
    void estado
    const result = solicitudDomainSchema.parse(sinEstado)
    expect(result.estado).toBe("recibida")
  })

  it("rechaza un folio que no cumple con la regex VL-NNNNNN-NNNN", () => {
    expect(
      solicitudDomainSchema.safeParse({ ...validSolicitudDomain, folio: "ABC-001" })
        .success,
    ).toBe(false)
  })
})
