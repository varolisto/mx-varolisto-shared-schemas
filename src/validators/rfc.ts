/**
 * Validador de RFC (Registro Federal de Contribuyentes) mexicano.
 *
 * Dos formatos válidos:
 *   - Persona física: 13 caracteres (AAAA + AAMMDD + XXX)
 *   - Persona moral: 12 caracteres (AAA + AAMMDD + XXX)
 *
 * Donde los últimos 3 caracteres son la homoclave (alfanumérica).
 * Los 6 dígitos de fecha usan formato AAMMDD con validación de mes y día.
 */

const RFC_PERSONA_FISICA_REGEX =
  /^[A-ZÑ&]{4}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z0-9]{3}$/

const RFC_PERSONA_MORAL_REGEX =
  /^[A-ZÑ&]{3}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z0-9]{3}$/

export type TipoRfc = "persona_fisica" | "persona_moral"

export type RfcValidationResult =
  | { valid: true; tipo: TipoRfc }
  | {
      valid: false
      reason:
        | "longitud_incorrecta"
        | "caracteres_no_permitidos"
        | "formato_invalido"
    }

export function validateRfc(rfc: string): RfcValidationResult {
  if (typeof rfc !== "string") {
    return { valid: false, reason: "caracteres_no_permitidos" }
  }

  const normalized = rfc.trim().toUpperCase()

  if (normalized.length !== 12 && normalized.length !== 13) {
    return { valid: false, reason: "longitud_incorrecta" }
  }

  if (!/^[A-ZÑ&0-9]+$/.test(normalized)) {
    return { valid: false, reason: "caracteres_no_permitidos" }
  }

  if (normalized.length === 13 && RFC_PERSONA_FISICA_REGEX.test(normalized)) {
    return { valid: true, tipo: "persona_fisica" }
  }

  if (normalized.length === 12 && RFC_PERSONA_MORAL_REGEX.test(normalized)) {
    return { valid: true, tipo: "persona_moral" }
  }

  return { valid: false, reason: "formato_invalido" }
}

export function isValidRfc(rfc: string): boolean {
  return validateRfc(rfc).valid
}
