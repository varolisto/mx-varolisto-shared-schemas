import { z } from 'zod'
import { RELACION_REFERENCIA } from '../enums/relacionReferencia.js'
import { zStr } from '../helpers.js'
import { isValidTelefonoMx } from '../validators/telefonoMx.js'

const nombreReferenciaSchema = zStr()
  .min(2, 'Escríbelo completo')
  .max(100, 'Máximo 100 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/, 'Sólo letras, sin números ni símbolos')

const telefonoReferenciaSchema = zStr().refine(
  isValidTelefonoMx,
  'Tu celular debe tener 10 dígitos',
)

const relacionReferenciaSchema = z.enum(RELACION_REFERENCIA, {
  error: () => 'Selecciona una relación',
})

const emailReferenciaSchema = z
  .string()
  .max(100, 'Máximo 100 caracteres')
  .email('Revisa el correo, parece tener un error')
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
    message: 'Este teléfono es el mismo que el del Contacto 1',
    path: ['ref2Telefono'],
  })

export type Paso5Data = z.infer<typeof paso5Schema>
