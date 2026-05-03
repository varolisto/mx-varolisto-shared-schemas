import { describe, it, expect } from "vitest"
import { listaResponseSchema, solicitudResumenSchema } from "./lista.js"

const validResumen = {
  folio: "VL-202601-0042",
  estado: "recibida" as const,
  created_at: "2026-05-02T10:30:00.000Z",
  solicitante_nombre_completo: "Juan Pérez García",
  solicitante_curp: "MARJ800101HDFRRR09",
  monto_solicitado: 10000,
  plazo_meses: 4,
}

describe("solicitudResumenSchema", () => {
  it("acepta un resumen válido", () => {
    expect(solicitudResumenSchema.safeParse(validResumen).success).toBe(true)
  })

  it("rechaza un estado fuera del enum", () => {
    expect(
      solicitudResumenSchema.safeParse({ ...validResumen, estado: "X" }).success,
    ).toBe(false)
  })
})

describe("listaResponseSchema", () => {
  it("acepta un response con array vacío", () => {
    expect(
      listaResponseSchema.safeParse({
        solicitudes: [],
        total: 0,
        page: 1,
        pageSize: 20,
      }).success,
    ).toBe(true)
  })

  it("acepta un response con un resumen", () => {
    expect(
      listaResponseSchema.safeParse({
        solicitudes: [validResumen],
        total: 1,
        page: 1,
        pageSize: 20,
      }).success,
    ).toBe(true)
  })
})
