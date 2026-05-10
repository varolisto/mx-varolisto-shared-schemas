import { PLAZO_MESES, type PlazoMeses } from '../enums/plazoMeses.js'

const REGLAS_PLAZO = [
  { montoMax: 3499, plazoMax: 3 },
  { montoMax: 7000, plazoMax: 4 },
  { montoMax: 12000, plazoMax: 5 },
  { montoMax: Number.POSITIVE_INFINITY, plazoMax: 6 },
] as const

/**
 * Devuelve los plazos disponibles para un monto dado.
 *
 * @example
 * getPlazosDisponibles(3000)  // ['2', '3']
 * getPlazosDisponibles(5000)  // ['2', '3', '4']
 * getPlazosDisponibles(15000) // ['2', '3', '4', '5', '6']
 */
export function getPlazosDisponibles(monto: number): PlazoMeses[] {
  const regla = REGLAS_PLAZO.find((r) => monto <= r.montoMax)
  if (!regla) return [...PLAZO_MESES]
  return PLAZO_MESES.filter((p) => Number.parseInt(p, 10) <= regla.plazoMax)
}

/** Devuelve el plazo máximo disponible para un monto dado. */
export function getPlazoMaximo(monto: number): PlazoMeses {
  const disponibles = getPlazosDisponibles(monto)
  return disponibles[disponibles.length - 1]
}
