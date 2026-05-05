import { z } from 'zod'

export function zStr(msg = 'Campo requerido') {
  return z
    .string({ error: () => msg })
    .trim()
    .min(1, msg)
}

export function enumSelecciona<T extends readonly [string, ...string[]]>(values: T) {
  return z.enum(values, { error: () => 'Selecciona una opción' })
}

export const uuidSchema = z.string().uuid()
