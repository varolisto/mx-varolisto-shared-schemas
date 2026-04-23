import { z } from "zod"

// TODO: definir schema de solicitud de crédito persistida
export const solicitudDomainSchema = z.object({})

export type SolicitudDomain = z.infer<typeof solicitudDomainSchema>
