import { z } from 'zod'

export const paso7Schema = z.object({
  aceptaPrivacidad: z.literal(true, {
    error: () => 'Debes aceptar el Aviso de Privacidad',
  }),
  aceptaTerminos: z.literal(true, {
    error: () => 'Debes aceptar los Términos y Condiciones',
  }),
})

export type Paso7Data = z.infer<typeof paso7Schema>
