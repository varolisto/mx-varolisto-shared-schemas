import { z } from "zod"

// TODO: definir schema de scoring crediticio
export const scoringSchema = z.object({})

export type Scoring = z.infer<typeof scoringSchema>
