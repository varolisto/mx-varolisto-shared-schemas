import { z } from 'zod'

// TODO: definir schema de préstamo activo
export const prestamoSchema = z.object({})

export type Prestamo = z.infer<typeof prestamoSchema>
