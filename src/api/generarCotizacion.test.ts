import { describe, it, expect } from "vitest"
import {
  generarCotizacionRequestSchema,
  generarCotizacionResponseSchema,
} from "./generarCotizacion.js"

describe("generarCotizacionRequestSchema (placeholder)", () => {
  it("acepta un objeto vacío (TODO: definir shape)", () => {
    expect(generarCotizacionRequestSchema.safeParse({}).success).toBe(true)
  })
})

describe("generarCotizacionResponseSchema (placeholder)", () => {
  it("acepta un objeto vacío (TODO: definir shape)", () => {
    expect(generarCotizacionResponseSchema.safeParse({}).success).toBe(true)
  })
})
