export const ESTADO_VALIDACION_OCR = ['pendiente', 'procesando', 'completado', 'fallido'] as const

export type EstadoValidacionOcr = (typeof ESTADO_VALIDACION_OCR)[number]
