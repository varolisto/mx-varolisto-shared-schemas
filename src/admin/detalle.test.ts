import { describe, it, expect } from "vitest"
import { detalleResponseSchema } from "./detalle.js"

const validDetalle = {
  solicitud: {
    id: "550e8400-e29b-41d4-a716-446655440000",
    folio: "VL-202601-0042",
    montoSolicitado: 10000,
    plazoMeses: 4,
    destino: "capital_trabajo",
    destinoOtro: null,
    esPrimerCredito: true,
    estado: "recibida",
    motivoRechazo: null,
    motivoCancelacion: null,
    notaOperador: null,
    montoAprobado: null,
    plazoAprobado: null,
    tasaMensualAprobada: null,
    comisionAperturaAprobada: null,
    aprobadaAt: null,
    canceladaAt: null,
    createdAt: "2026-05-02T10:30:00.000Z",
    updatedAt: "2026-05-02T10:30:00.000Z",
  },
  solicitante: {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    curp: "MARJ800101HDFRRR09",
    nombre: "Juan",
    apellidoPaterno: "Pérez",
    apellidoMaterno: "García",
    fechaNacimiento: "1990-01-01",
    sexo: "M",
    telefono: "5512345678",
    rfc: "MARJ800101ABC",
    correo: "juan@example.com",
    fallecido: false,
    bloqueadoPorFraude: false,
  },
  ingresos: null,
  referencias: [],
  archivos: [],
  scoring: null,
  parametros_aplicables: null,
  eventos: [],
}

describe("detalleResponseSchema", () => {
  it("acepta un detalle mínimo válido", () => {
    const result = detalleResponseSchema.safeParse(validDetalle)
    if (!result.success) {
      console.error(result.error.format())
    }
    expect(result.success).toBe(true)
  })

  it("rechaza si el id de solicitud no es UUID", () => {
    const invalid = {
      ...validDetalle,
      solicitud: { ...validDetalle.solicitud, id: "not-a-uuid" },
    }
    expect(detalleResponseSchema.safeParse(invalid).success).toBe(false)
  })
})
