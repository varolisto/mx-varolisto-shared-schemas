import { z } from "zod"

export function zStr(msg = "Campo requerido") {
  return z.string().min(1, msg)
}
