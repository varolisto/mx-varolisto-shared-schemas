import { z } from 'zod'
import { MONTO_MAX, MONTO_MIN, PLAZO_MAX, PLAZO_MIN } from '../constants.js'

export const calcularPropuestaRequestSchema = z.object({
  monto_aprobado: z.number().min(MONTO_MIN).max(MONTO_MAX),
  plazo_aprobado: z.number().int().min(PLAZO_MIN).max(PLAZO_MAX),
})

export type CalcularPropuestaRequest = z.infer<typeof calcularPropuestaRequestSchema>

export const filaAmortizacionSchema = z.object({
  mes: z.number().int(),
  cuota: z.number(),
  capital: z.number(),
  intereses: z.number(),
  cuota_servicio: z.number(),
  pago_total: z.number(),
  saldo_post: z.number(),
})

export type FilaAmortizacion = z.infer<typeof filaAmortizacionSchema>

export const calcularPropuestaResponseSchema = z.object({
  monto_aprobado: z.number(),
  plazo_aprobado: z.number().int(),
  tasa_mensual: z.number(),
  comision_apertura: z.number(),
  comision_apertura_monto: z.number(),
  iva_comision: z.number(),
  cuota_mensual: z.number(),
  total_a_pagar: z.number(),
  monto_a_depositar: z.number(),
  tabla_amortizacion: z.array(filaAmortizacionSchema),
})

export type CalcularPropuestaResponse = z.infer<typeof calcularPropuestaResponseSchema>
