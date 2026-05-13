import { z } from 'zod'
import { DECISION_OCR } from '../enums/decisionOcr.js'
import { ESTADO_VALIDACION_OCR } from '../enums/estadoValidacionOcr.js'
import { PROVEEDOR_VALIDACION_OCR } from '../enums/proveedorValidacionOcr.js'
import { uuidSchema } from '../helpers.js'

export const archivoValidacionDomainSchema = z
  .object({
    id: uuidSchema,
    archivoId: uuidSchema,
    intento: z.number().int().min(1),
    estado: z.enum(ESTADO_VALIDACION_OCR),
    decisionOcr: z.enum(DECISION_OCR).nullable(),
    proveedor: z.enum(PROVEEDOR_VALIDACION_OCR),
    razonEstructurada: z.record(z.string(), z.unknown()).nullable(),
    camposCruzados: z.record(z.string(), z.unknown()).nullable(),
    rawPayloadTextract: z.unknown().nullable(),
    errorDetalle: z.string().max(2000).nullable(),
    procesadoAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
  })
  .superRefine((data, ctx) => {
    if (data.estado === 'completado' && data.decisionOcr === null) {
      ctx.addIssue({
        code: 'custom',
        path: ['decisionOcr'],
        message: 'decisionOcr es obligatorio cuando estado=completado',
      })
    }
    if (data.estado === 'fallido') {
      if (data.errorDetalle === null) {
        ctx.addIssue({
          code: 'custom',
          path: ['errorDetalle'],
          message: 'errorDetalle es obligatorio cuando estado=fallido',
        })
      }
      if (data.decisionOcr !== null) {
        ctx.addIssue({
          code: 'custom',
          path: ['decisionOcr'],
          message: 'decisionOcr debe ser null cuando estado=fallido',
        })
      }
    }
  })

export type ArchivoValidacionDomain = z.infer<typeof archivoValidacionDomainSchema>
