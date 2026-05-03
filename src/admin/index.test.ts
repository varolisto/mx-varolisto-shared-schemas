import { describe, expect, it } from 'vitest'
import {
  calcularPropuestaRequestSchema,
  calcularPropuestaResponseSchema,
} from './calcular-propuesta.js'
import { cancelarRequestSchema } from './cancelar.js'
import { actualizarDatosPersonalesAdminRequestSchema } from './datos-personales.js'
import { listaFiltrosSchema } from './filtros.js'
import { listaResponseSchema } from './lista.js'
import { rechazarRequestSchema } from './rechazar.js'
import { cerrarScoringRequestSchema } from './scoring.js'

describe('calcularPropuestaRequestSchema', () => {
  it('acepta valores válidos', () => {
    expect(
      calcularPropuestaRequestSchema.safeParse({ monto_aprobado: 10000, plazo_aprobado: 4 })
        .success,
    ).toBe(true)
  })

  it('rechaza monto fuera del rango', () => {
    expect(
      calcularPropuestaRequestSchema.safeParse({ monto_aprobado: 500, plazo_aprobado: 4 }).success,
    ).toBe(false)
  })
})

describe('calcularPropuestaResponseSchema', () => {
  it('acepta respuesta de amortización válida', () => {
    const r = calcularPropuestaResponseSchema.safeParse({
      monto_aprobado: 10000,
      plazo_aprobado: 4,
      tasa_mensual: 0.04,
      comision_apertura: 500,
      cuota_mensual: 2750,
      total_a_pagar: 11000,
      monto_a_depositar: 9500,
      tabla_amortizacion: [
        {
          mes: 1,
          cuota: 2750,
          capital: 2350,
          intereses: 400,
          cuota_servicio: 0,
          pago_total: 2750,
          saldo_post: 7650,
        },
      ],
    })
    expect(r.success).toBe(true)
  })
})

describe('cerrarScoringRequestSchema', () => {
  it('acepta v5 y v7 válidos', () => {
    expect(cerrarScoringRequestSchema.safeParse({ v5: 10, v7: 3 }).success).toBe(true)
  })

  it('acepta con v2_override opcional', () => {
    const r = cerrarScoringRequestSchema.safeParse({
      v5: 10,
      v7: 3,
      v2_override: { nuevo_valor: 15, justificacion: 'Ingreso verificado con IMSS' },
    })
    expect(r.success).toBe(true)
  })

  it('rechaza v5 fuera del rango', () => {
    expect(cerrarScoringRequestSchema.safeParse({ v5: 20, v7: 3 }).success).toBe(false)
  })
})

describe('rechazarRequestSchema', () => {
  it('acepta motivo y nota válidos', () => {
    const r = rechazarRequestSchema.safeParse({
      motivo: 'score_insuficiente',
      nota_operador: 'El solicitante no cumple con la relación cuota-ingreso mínima requerida.',
    })
    expect(r.success).toBe(true)
  })

  it('rechaza nota con menos de 10 caracteres', () => {
    const r = rechazarRequestSchema.safeParse({
      motivo: 'capacidad_pago_insuficiente',
      nota_operador: 'Corta',
    })
    expect(r.success).toBe(false)
  })
})

describe('cancelarRequestSchema', () => {
  it('acepta motivo de cancelación válido', () => {
    const r = cancelarRequestSchema.safeParse({
      motivo: 'cliente_no_acepto_terminos',
      nota_operador: 'El cliente llamó para cancelar su solicitud voluntariamente.',
    })
    expect(r.success).toBe(true)
  })
})

describe('listaFiltrosSchema', () => {
  it('acepta filtros vacíos (usa defaults)', () => {
    const r = listaFiltrosSchema.safeParse({})
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.page).toBe(1)
      expect(r.data.pageSize).toBe(20)
    }
  })

  it('acepta filtros completos', () => {
    const r = listaFiltrosSchema.safeParse({
      estado: 'recibida',
      desde: '2026-01-01T00:00:00.000Z',
      hasta: '2026-12-31T23:59:59.000Z',
      page: '2',
      pageSize: '50',
    })
    expect(r.success).toBe(true)
  })
})

describe('listaResponseSchema', () => {
  it('acepta lista con solicitudes', () => {
    const r = listaResponseSchema.safeParse({
      solicitudes: [
        {
          folio: 'VL-202601-0042',
          estado: 'recibida',
          created_at: new Date().toISOString(),
          solicitante_nombre_completo: 'Juan Pérez García',
          solicitante_curp: 'PERJ900615HDFRZN08',
          monto_solicitado: 10000,
          plazo_meses: 4,
        },
      ],
      total: 1,
      page: 1,
      pageSize: 20,
    })
    expect(r.success).toBe(true)
  })
})

describe('actualizarDatosPersonalesAdminRequestSchema', () => {
  it('acepta datos sin aval', () => {
    const r = actualizarDatosPersonalesAdminRequestSchema.safeParse({
      numeroIdentificacion: 'ABCD123456',
      clabeDeudor: '646180157000000004',
    })
    expect(r.success).toBe(true)
  })

  it('acepta datos con aval completo', () => {
    const r = actualizarDatosPersonalesAdminRequestSchema.safeParse({
      numeroIdentificacion: 'ABCD123456',
      clabeDeudor: '646180157000000004',
      avalNombre: 'María López',
      avalNumeroIdentificacion: 'WXYZ987654',
      avalTelefono: '5598765432',
    })
    expect(r.success).toBe(true)
  })

  it('rechaza aval incompleto (solo nombre)', () => {
    const r = actualizarDatosPersonalesAdminRequestSchema.safeParse({
      numeroIdentificacion: 'ABCD123456',
      clabeDeudor: '646180157000000004',
      avalNombre: 'María López',
    })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues.some((i) => i.message.includes('datos del aval'))).toBe(true)
    }
  })

  it('rechaza CLABE con longitud incorrecta', () => {
    const r = actualizarDatosPersonalesAdminRequestSchema.safeParse({
      numeroIdentificacion: 'ABCD123456',
      clabeDeudor: '12345',
    })
    expect(r.success).toBe(false)
  })
})
