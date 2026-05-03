import { describe, it, expect } from "vitest"
import {
  crearSolicitudRequestSchema,
  crearSolicitudResponseSchema,
} from "./crearSolicitud.js"
import { validSolicitudCompleta } from "../__fixtures__/solicitud.fixture.js"

describe("crearSolicitudRequestSchema", () => {
  it("acepta el fixture validSolicitudCompleta — protege el contrato con el frontend (buildPayload.test.ts)", () => {
    expect(crearSolicitudRequestSchema.safeParse(validSolicitudCompleta).success).toBe(true)
  })

  it("rechaza un payload sin campos requeridos", () => {
    expect(crearSolicitudRequestSchema.safeParse({}).success).toBe(false)
  })
})

describe("crearSolicitudResponseSchema", () => {
  const validResponse = {
    folio: "VL-202601-0042",
    estado: "recibida" as const,
    fechaCreacion: "2026-05-02T10:30:00.000Z",
    tiempoEsperadoRespuesta: "24-48 horas",
  }

  it("acepta un response válido", () => {
    expect(crearSolicitudResponseSchema.safeParse(validResponse).success).toBe(true)
  })

  it("rechaza un folio que no cumple con la regex VL-NNNNNN-NNNN", () => {
    expect(
      crearSolicitudResponseSchema.safeParse({ ...validResponse, folio: "ABC-123" })
        .success,
    ).toBe(false)
  })

  it("rechaza un estado fuera de ESTADO_SOLICITUD", () => {
    expect(
      crearSolicitudResponseSchema.safeParse({ ...validResponse, estado: "pagada" })
        .success,
    ).toBe(false)
  })

  it("rechaza una fechaCreacion que no es ISO datetime", () => {
    expect(
      crearSolicitudResponseSchema.safeParse({
        ...validResponse,
        fechaCreacion: "2026-05-02",
      }).success,
    ).toBe(false)
  })
})
