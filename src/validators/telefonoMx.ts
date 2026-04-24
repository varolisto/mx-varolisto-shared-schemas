/**
 * Validador de teléfono mexicano.
 * Formato: 10 dígitos sin lada 52 ni prefijos internacionales.
 *
 * El primer dígito debe estar entre 2 y 9 (los números válidos en México
 * no empiezan con 0 ni 1).
 */

const TELEFONO_MX_REGEX = /^[2-9]\d{9}$/

export type TelefonoMxValidationResult =
  | { valid: true; normalized: string }
  | {
      valid: false
      reason:
        | "tipo_incorrecto"
        | "longitud_incorrecta"
        | "formato_invalido"
    }

export function validateTelefonoMx(
  telefono: string,
): TelefonoMxValidationResult {
  if (typeof telefono !== "string") {
    return { valid: false, reason: "tipo_incorrecto" }
  }

  const cleaned = telefono.replace(/[\s\-()\+]/g, "")

  if (cleaned.length !== 10) {
    return { valid: false, reason: "longitud_incorrecta" }
  }

  if (!TELEFONO_MX_REGEX.test(cleaned)) {
    return { valid: false, reason: "formato_invalido" }
  }

  return { valid: true, normalized: cleaned }
}

export function isValidTelefonoMx(telefono: string): boolean {
  return validateTelefonoMx(telefono).valid
}
