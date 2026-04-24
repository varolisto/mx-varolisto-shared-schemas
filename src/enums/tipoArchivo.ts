export const TIPO_ARCHIVO = [
  "comprobante_ingreso",
  "ine_frente",
  "ine_reverso",
  "comprobante_domicilio",
  "propuesta_pdf",
  "pagare_pdf",
  "contrato_pdf",
  "comprobante_liquidacion_pdf",
  "otro",
] as const

export type TipoArchivo = typeof TIPO_ARCHIVO[number]
