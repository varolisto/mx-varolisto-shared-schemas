import { describe, it, expect } from "vitest"
import { solicitudSchema } from "./index.js"
import { validSolicitudCompleta } from "../__fixtures__/solicitud.fixture.js"

describe("solicitudSchema (paso1+...+paso6 combinado)", () => {
  it("acepta el fixture validSolicitudCompleta", () => {
    const result = solicitudSchema.safeParse(validSolicitudCompleta)
    if (!result.success) {
      // Útil cuando el fixture diverge del schema
      console.error(result.error.format())
    }
    expect(result.success).toBe(true)
  })

  it("rechaza si paso5.clabe es inválida (propaga falla del schema combinado)", () => {
    const result = solicitudSchema.safeParse({
      ...validSolicitudCompleta,
      clabe: "646180157000000000",
    })
    expect(result.success).toBe(false)
  })

  it("rechaza si paso2.montoSolicitado está fuera de rango", () => {
    const result = solicitudSchema.safeParse({
      ...validSolicitudCompleta,
      montoSolicitado: 100,
    })
    expect(result.success).toBe(false)
  })

  it("rechaza si paso6.aceptaTerminos no es true", () => {
    const result = solicitudSchema.safeParse({
      ...validSolicitudCompleta,
      aceptaTerminos: false,
    })
    expect(result.success).toBe(false)
  })
})
