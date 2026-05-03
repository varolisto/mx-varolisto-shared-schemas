import { describe, it, expect } from "vitest"
import { cerrarScoringRequestSchema } from "./scoring.js"

describe("cerrarScoringRequestSchema", () => {
  it("acepta v5 y v7 dentro de rango sin override", () => {
    expect(
      cerrarScoringRequestSchema.safeParse({ v5: 10, v7: 4 }).success,
    ).toBe(true)
  })

  it("acepta v2_override con justificación", () => {
    expect(
      cerrarScoringRequestSchema.safeParse({
        v5: 10,
        v7: 4,
        v2_override: {
          nuevo_valor: 18,
          justificacion: "Cliente con ingresos verificados directamente.",
        },
      }).success,
    ).toBe(true)
  })

  it("rechaza v2_override.nuevo_valor > 20", () => {
    expect(
      cerrarScoringRequestSchema.safeParse({
        v5: 10,
        v7: 4,
        v2_override: {
          nuevo_valor: 25,
          justificacion: "Justificación con suficiente longitud.",
        },
      }).success,
    ).toBe(false)
  })

  it("rechaza justificación con menos de 10 caracteres", () => {
    expect(
      cerrarScoringRequestSchema.safeParse({
        v5: 10,
        v7: 4,
        v2_override: { nuevo_valor: 18, justificacion: "corta" },
      }).success,
    ).toBe(false)
  })
})
