import { z } from 'zod'

export const actualizarDatosPersonalesAdminRequestSchema = z
  .object({
    numeroIdentificacion: z
      .string()
      .regex(/^[A-Z0-9]{9,13}$/, 'Debe tener entre 9 y 13 caracteres alfanuméricos'),
    clabeDeudor: z
      .string()
      .length(18, 'La CLABE debe tener exactamente 18 dígitos')
      .regex(/^\d{18}$/, 'La CLABE debe contener solo dígitos'),
    avalNombre: z
      .string()
      .min(3, 'Mínimo 3 caracteres')
      .max(150, 'Máximo 150 caracteres')
      .optional(),
    avalNumeroIdentificacion: z
      .string()
      .regex(/^[A-Z0-9]{9,13}$/, 'Debe tener entre 9 y 13 caracteres alfanuméricos')
      .optional(),
    avalTelefono: z
      .string()
      .regex(/^\d{10}$/, 'El teléfono del aval debe tener 10 dígitos')
      .optional(),
  })
  .refine(
    (data) => {
      const avalFields = [data.avalNombre, data.avalNumeroIdentificacion, data.avalTelefono]
      const provided = avalFields.filter((f) => f !== undefined)
      return provided.length === 0 || provided.length === 3
    },
    {
      message:
        'Si capturas datos del aval, debes proporcionar nombre, número de identificación y teléfono',
      path: ['avalNombre'],
    },
  )

export type ActualizarDatosPersonalesAdminRequest = z.infer<
  typeof actualizarDatosPersonalesAdminRequestSchema
>
