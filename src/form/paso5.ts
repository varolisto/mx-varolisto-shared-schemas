import { z } from 'zod'
import { RELACION_REFERENCIA } from '../enums/relacionReferencia.js'
import { zStr } from '../helpers.js'
import { isValidTelefonoMx } from '../validators/telefonoMx.js'

function referenciaFormFields(prefix: 'ref1' | 'ref2') {
  return {
    [`${prefix}Nombre`]: zStr()
      .min(2, 'Mínimo 2 caracteres')
      .max(100, 'Máximo 100 caracteres')
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/, 'Solo se permiten letras'),
    [`${prefix}Telefono`]: zStr().refine(
      isValidTelefonoMx,
      'Ingresa un teléfono válido de 10 dígitos',
    ),
    [`${prefix}Relacion`]: z.enum(RELACION_REFERENCIA, { error: () => 'Selecciona una relación' }),
    [`${prefix}Email`]: z
      .string()
      .max(100, 'Máximo 100 caracteres')
      .email('Correo inválido')
      .optional()
      .or(z.literal('')),
  }
}

export const paso5Schema = z
  .object({
    ...referenciaFormFields('ref1'),
    ...referenciaFormFields('ref2'),
  })
  .refine((data) => data.ref1Telefono !== data.ref2Telefono, {
    message: 'El teléfono de la segunda referencia no puede ser igual al primero',
    path: ['ref2Telefono'],
  })

export type Paso5Data = z.infer<typeof paso5Schema>
