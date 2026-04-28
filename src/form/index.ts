export { paso1Schema } from "./paso1.js"
export type { Paso1Data } from "./paso1.js"
export { paso2Schema } from "./paso2.js"
export type { Paso2Data } from "./paso2.js"
export { paso3Schema } from "./paso3.js"
export type { Paso3Data } from "./paso3.js"
export { paso4Schema } from "./paso4.js"
export type { Paso4Data } from "./paso4.js"
export { paso5Schema } from "./paso5.js"
export type { Paso5Data } from "./paso5.js"
export { paso6Schema, archivoDeclaradoSchema, ACCEPTED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from "./paso6.js"
export type { Paso6Data, ArchivoDeclarado } from "./paso6.js"
export { paso7Schema } from "./paso7.js"
export type { Paso7Data } from "./paso7.js"

import { paso1Schema } from "./paso1.js"
import { paso2Schema } from "./paso2.js"
import { paso3Schema } from "./paso3.js"
import { paso4Schema } from "./paso4.js"
import { paso5Schema } from "./paso5.js"
import { paso6Schema } from "./paso6.js"
import { paso7Schema } from "./paso7.js"

export const solicitudSchema = paso1Schema
  .and(paso2Schema)
  .and(paso3Schema)
  .and(paso4Schema)
  .and(paso5Schema)
  .and(paso6Schema)
  .and(paso7Schema)

export type SolicitudCompleta = import("zod").infer<typeof solicitudSchema>
