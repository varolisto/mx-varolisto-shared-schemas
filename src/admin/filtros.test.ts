import { describe, it, expect } from "vitest"
import { listaFiltrosSchema } from "./filtros.js"

describe("listaFiltrosSchema", () => {
  it("aplica defaults page=1 y pageSize=20 cuando no se pasan", () => {
    const result = listaFiltrosSchema.parse({})
    expect(result.page).toBe(1)
    expect(result.pageSize).toBe(20)
  })

  it("acepta filtros completos válidos", () => {
    expect(
      listaFiltrosSchema.safeParse({
        estado: "aprobada",
        desde: "2026-01-01T00:00:00.000Z",
        hasta: "2026-12-31T23:59:59.999Z",
        page: 2,
        pageSize: 50,
      }).success,
    ).toBe(true)
  })

  it("coerce strings a number en page y pageSize (origen query string)", () => {
    const result = listaFiltrosSchema.parse({ page: "3", pageSize: "50" })
    expect(result.page).toBe(3)
    expect(result.pageSize).toBe(50)
  })

  it("rechaza pageSize > 100", () => {
    expect(listaFiltrosSchema.safeParse({ pageSize: 200 }).success).toBe(false)
  })

  it("rechaza un estado fuera de ESTADO_SOLICITUD", () => {
    expect(
      listaFiltrosSchema.safeParse({ estado: "perdida" }).success,
    ).toBe(false)
  })
})
