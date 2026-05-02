export const ORIGEN_ARCHIVO = [
  'operador',
  'solicitante_formulario',
  'solicitante_link',
  'sistema_generado',
  'proveedor_externo',
] as const

export type OrigenArchivo = (typeof ORIGEN_ARCHIVO)[number]
