import { describe, it, expect } from "vitest"
import {
  emitirPropuestaRequestSchema,
  emitirPropuestaResponseSchema,
} from "./emitir-propuesta.js"

describe("emitirPropuestaRequestSchema (strict empty object)", () => {
  it("acepta un objeto vacío", () => {
    expect(emitirPropuestaRequestSchema.safeParse({}).success).toBe(true)
  })

  it("rechaza propiedades adicionales (strict)", () => {
    expect(
      emitirPropuestaRequestSchema.safeParse({ extra: true }).success,
    ).toBe(false)
  })
})

describe("emitirPropuestaResponseSchema", () => {
  it("acepta un response válido", () => {
    expect(
      emitirPropuestaResponseSchema.safeParse({
        archivo_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        url_descarga: "https://storage.example.com/files/propuesta.pdf",
        expires_in: 3600,
        generado_at: "2026-05-02T10:30:00.000Z",
      }).success,
    ).toBe(true)
  })

  it("rechaza url_descarga que no es URL", () => {
    expect(
      emitirPropuestaResponseSchema.safeParse({
        archivo_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        url_descarga: "not-a-url",
        expires_in: 3600,
        generado_at: "2026-05-02T10:30:00.000Z",
      }).success,
    ).toBe(false)
  })
})
