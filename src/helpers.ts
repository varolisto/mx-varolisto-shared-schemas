import { z } from "zod"

export function zStr(msg = "Campo requerido") {
  return z.string({ error: () => msg }).trim().min(1, msg)
}
