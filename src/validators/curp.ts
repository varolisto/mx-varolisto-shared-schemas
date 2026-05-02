/**
 * Validador de CURP (Clave Única de Registro de Población) mexicana.
 *
 * Formato: 18 caracteres alfanuméricos.
 * Posiciones:
 *   1-4: Letras (apellidos + nombre)
 *   5-10: Fecha de nacimiento AAMMDD
 *   11: Sexo (H/M/X)
 *   12-13: Estado de nacimiento
 *   14-16: Consonantes (sin vocales excepto X)
 *   17: Discriminador de siglo (letra o dígito)
 *   18: Dígito verificador
 */

const CURP_REGEX =
  /^[A-Z][AEIOUX][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HMX][A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}[A-Z\d]\d$/

export type CurpValidationResult =
  | { valid: true }
  | {
      valid: false
      reason: 'longitud_incorrecta' | 'caracteres_no_permitidos' | 'formato_invalido'
    }

export function validateCurp(curp: string): CurpValidationResult {
  if (typeof curp !== 'string') {
    return { valid: false, reason: 'caracteres_no_permitidos' }
  }

  const normalized = curp.trim().toUpperCase()

  if (normalized.length !== 18) {
    return { valid: false, reason: 'longitud_incorrecta' }
  }

  if (!/^[A-Z0-9]{18}$/.test(normalized)) {
    return { valid: false, reason: 'caracteres_no_permitidos' }
  }

  if (!CURP_REGEX.test(normalized)) {
    return { valid: false, reason: 'formato_invalido' }
  }

  return { valid: true }
}

export function isValidCurp(curp: string): boolean {
  return validateCurp(curp).valid
}
