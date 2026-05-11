import { describe, expect, it } from 'vitest'
import { paso4Schema } from './paso4.js'

const baseSinDeudas = {
  tipoActividad: 'empleado_formal' as const,
  nombreEmpleadorNegocio: 'ACME S.A. de C.V.',
  antiguedad: 'mas_2' as const,
  estadoCivil: 'casado' as const,
  dependientesEconomicos: 'dos' as const,
  ingresoMensual: 25000,
  gastoMensual: 8000,
  tieneDeudas: 'no' as const,
}

const baseConDeudas = {
  ...baseSinDeudas,
  tieneDeudas: 'si' as const,
  cantidadDeudas: 'una_deuda' as const,
  montoTotalDeudas: '5k_15k' as const,
  pagoMensualDeudas: 1500,
}

describe('paso4Schema', () => {
  it('acepta situación laboral sin deudas', () => {
    expect(paso4Schema.safeParse(baseSinDeudas).success).toBe(true)
  })

  it('acepta situación laboral con deudas completas', () => {
    expect(paso4Schema.safeParse(baseConDeudas).success).toBe(true)
  })

  it('rechaza tipoActividad fuera del enum', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, tipoActividad: 'freelancer' })
    expect(r.success).toBe(false)
  })

  it('rechaza nombreEmpleadorNegocio con menos de 2 caracteres', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, nombreEmpleadorNegocio: 'X' })
    expect(r.success).toBe(false)
  })

  it('rechaza antiguedad fuera del enum', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, antiguedad: 'diez_anos' })
    expect(r.success).toBe(false)
  })

  it('rechaza estadoCivil fuera del enum', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, estadoCivil: 'comprometido' })
    expect(r.success).toBe(false)
  })

  it('rechaza dependientesEconomicos fuera del enum', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, dependientesEconomicos: 'cinco' })
    expect(r.success).toBe(false)
  })

  it('rechaza ingresoMensual menor a 1000', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, ingresoMensual: 999 })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues[0]?.message).toBe('El ingreso debe ser de al menos $1,000')
    }
  })

  it('rechaza tieneDeudas=si sin cantidadDeudas', () => {
    const r = paso4Schema.safeParse({
      ...baseConDeudas,
      cantidadDeudas: undefined,
    })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues.some((i) => i.message === 'Falta este dato')).toBe(true)
    }
  })

  it('rechaza tieneDeudas=si sin montoTotalDeudas', () => {
    const r = paso4Schema.safeParse({
      ...baseConDeudas,
      montoTotalDeudas: undefined,
    })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues.some((i) => i.message === 'Falta este dato')).toBe(true)
    }
  })

  it('rechaza tieneDeudas=si sin pagoMensualDeudas', () => {
    const r = paso4Schema.safeParse({
      ...baseConDeudas,
      pagoMensualDeudas: undefined,
    })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues.some((i) => i.message === 'Falta este dato')).toBe(true)
    }
  })

  it('ignora deudas opcionales cuando tieneDeudas=no', () => {
    const r = paso4Schema.safeParse({
      ...baseSinDeudas,
      cantidadDeudas: undefined,
      montoTotalDeudas: undefined,
      pagoMensualDeudas: undefined,
    })
    expect(r.success).toBe(true)
  })

  it('rechaza tieneDeudas con valor fuera del enum', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, tieneDeudas: 'tal_vez' })
    expect(r.success).toBe(false)
    if (!r.success) {
      expect(r.error.issues[0]?.message).toBe('Selecciona una opción')
    }
  })

  it('rechaza ingresoMensual no numérico', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, ingresoMensual: 'veinte mil' })
    expect(r.success).toBe(false)
  })

  it('rechaza nombreEmpleadorNegocio con más de 120 caracteres', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, nombreEmpleadorNegocio: 'A'.repeat(121) })
    expect(r.success).toBe(false)
  })

  it('rechaza cuando falta gastoMensual', () => {
    const { gastoMensual: _, ...sinGasto } = baseSinDeudas
    const r = paso4Schema.safeParse(sinGasto)
    expect(r.success).toBe(false)
  })

  it('rechaza gastoMensual no numérico', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, gastoMensual: 'mil pesos' })
    expect(r.success).toBe(false)
  })

  it('rechaza gastoMensual negativo', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, gastoMensual: -100 })
    expect(r.success).toBe(false)
  })

  it('acepta gastoMensual = 0', () => {
    const r = paso4Schema.safeParse({ ...baseSinDeudas, gastoMensual: 0 })
    expect(r.success).toBe(true)
  })

  it('acepta gastoMensual igual al ingresoMensual', () => {
    const r = paso4Schema.safeParse({
      ...baseSinDeudas,
      ingresoMensual: 25000,
      gastoMensual: 25000,
    })
    expect(r.success).toBe(true)
  })

  it('rechaza gastoMensual mayor al ingresoMensual', () => {
    const r = paso4Schema.safeParse({
      ...baseSinDeudas,
      ingresoMensual: 20000,
      gastoMensual: 20001,
    })
    expect(r.success).toBe(false)
    if (!r.success) {
      const issue = r.error.issues.find((i) => i.path[0] === 'gastoMensual')
      expect(issue?.message).toBe('Tus gastos mensuales no pueden superar tus ingresos')
    }
  })
})
