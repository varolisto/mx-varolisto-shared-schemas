import { describe, it, expect } from "vitest"
import {
  calcularPropuestaRequestSchema,
  calcularPropuestaResponseSchema,
} from "./calcular-propuesta.js"

describe("calcularPropuestaRequestSchema", () => {
  it("acepta monto y plazo en rango", () => {
    expect(
      calcularPropuestaRequestSchema.safeParse({
        monto_aprobado: 10000,
        plazo_aprobado: 4,
      }).success,
    ).toBe(true)
  })

  it("rechaza plazo no entero", () => {
    expect(
      calcularPropuestaRequestSchema.safeParse({
        monto_aprobado: 10000,
        plazo_aprobado: 4.5,
      }).success,
    ).toBe(false)
  })
})

describe("calcularPropuestaResponseSchema", () => {
  const validResponse = {
    monto_aprobado: 10000,
    plazo_aprobado: 4,
    tasa_mensual: 0.05,
    comision_apertura: 500,
    cuota_mensual: 2750,
    total_a_pagar: 11000,
    monto_a_depositar: 9500,
    tabla_amortizacion: [
      {
        mes: 1,
        cuota: 2750,
        capital: 2250,
        intereses: 500,
        cuota_servicio: 0,
        pago_total: 2750,
        saldo_post: 7750,
      },
    ],
  }

  it("acepta un response válido", () => {
    expect(calcularPropuestaResponseSchema.safeParse(validResponse).success).toBe(true)
  })

  it("rechaza tabla_amortizacion con fila incompleta", () => {
    const invalid = {
      ...validResponse,
      tabla_amortizacion: [{ mes: 1, cuota: 2750 }],
    }
    expect(calcularPropuestaResponseSchema.safeParse(invalid).success).toBe(false)
  })
})
