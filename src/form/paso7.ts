import { z } from 'zod'

export const paso7Schema = z.object({
  aceptaPrivacidad: z.literal(true, {
    error: () => 'Necesitamos tu autorización para continuar',
  }),
  aceptaTerminos: z.literal(true, {
    error: () => 'Necesitamos que aceptes los términos para continuar',
  }),
})

export type Paso7Data = z.infer<typeof paso7Schema>
