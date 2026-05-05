import { z } from 'zod'
import { RELACION_REFERENCIA } from '../enums/relacionReferencia.js'
import { zStr } from '../helpers.js'
import { isValidTelefonoMx } from '../validators/telefonoMx.js'

const nombreReferenciaSchema = zStr()
  .min(2, 'Mínimo 2 caracteres')
  .max(100, 'Máximo 100 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/, 'Solo se permiten letras')

const telefonoReferenciaSchema = zStr().refine(
  isValidTelefonoMx,
  'Ingresa un teléfono válido de 10 dígitos',
)

const relacionReferenciaSchema = z.enum(RELACION_REFERENCIA, {
  error: () => 'Selecciona una relación',
})

const emailReferenciaSchema = z
  .string()
  .max(100, 'Máximo 100 caracteres')
  .email('Correo inválido')
  .optional()
  .or(z.literal(''))

export const paso5Schema = z
  .object({
    ref1Nombre: nombreReferenciaSchema,
    ref1Telefono: telefonoReferenciaSchema,
    ref1Relacion: relacionReferenciaSchema,
    ref1Email: emailReferenciaSchema,
    ref2Nombre: nombreReferenciaSchema,
    ref2Telefono: telefonoReferenciaSchema,
    ref2Relacion: relacionReferenciaSchema,
    ref2Email: emailReferenciaSchema,
  })
  .refine((data) => data.ref1Telefono !== data.ref2Telefono, {
    message: 'El teléfono de la segunda referencia no puede ser igual al primero',
    path: ['ref2Telefono'],
  })

export type Paso5Data = z.infer<typeof paso5Schema>
