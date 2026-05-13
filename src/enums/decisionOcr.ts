export const DECISION_OCR = [
  'validacion_automatica_ok',
  'bandera_revision_manual',
  'rechazo_automatico_por_fraude',
] as const

export type DecisionOcr = (typeof DECISION_OCR)[number]
