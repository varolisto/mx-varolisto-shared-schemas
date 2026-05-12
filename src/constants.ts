export const MONTO_MIN = 2000
export const MONTO_MAX = 20000

export const PLAZO_MIN = 2
export const PLAZO_MAX = 6

export const NOTA_OPERADOR_MIN = 10
export const NOTA_OPERADOR_MAX = 1000

export const GASTO_MENSUAL_MIN = 0
export const GASTO_MENSUAL_STEP = 500

export const FOLIO_REGEX = /^VL-\d{6}-\d{4}$/

// Límites de longitud de campos — fuente única de verdad para form/ y domain/
export const NOMBRE_MAX_LENGTH = 80
export const APELLIDO_MAX_LENGTH = 60
export const EMPLEADOR_MAX_LENGTH = 120
export const DIRECCION_TEXTO_MAX_LENGTH = 120
export const DIRECCION_NUMERO_MAX_LENGTH = 20
export const ARCHIVO_NOMBRE_MAX_LENGTH = 255

// Telemetría del formulario público (Bloque 1.B del rediseño v7)
export const TELEMETRIA_USER_AGENT_MAX_LENGTH = 512
export const TELEMETRIA_REFERRER_MAX_LENGTH = 2048
export const TELEMETRIA_FINGERPRINT_MAX_LENGTH = 128
export const TELEMETRIA_LOCALE_MAX_LENGTH = 35
export const TELEMETRIA_TIMEZONE_MAX_LENGTH = 64
export const TELEMETRIA_PLATAFORMA_MAX_LENGTH = 64
export const TELEMETRIA_CAMPO_MAX_LENGTH = 64
export const TELEMETRIA_EDICIONES_MAX_KEYS = 200
export const TELEMETRIA_EDICIONES_MAX_VALUE = 10_000
export const TELEMETRIA_CAMPO_KEY_REGEX = /^[a-zA-Z0-9._-]+$/
