import { z } from "zod"
import { ESTADO_SOLICITUD } from "../enums/estadoSolicitud.js"
import { MOTIVO_RECHAZO } from "../enums/motivoRechazo.js"
import { MOTIVO_CANCELACION } from "../enums/motivoCancelacion.js"
import { DESTINO_PRESTAMO } from "../enums/destinoPrestamo.js"
import { SEXO } from "../enums/sexo.js"
import { TIPO_ACTIVIDAD } from "../enums/tipoActividad.js"
import { CANTIDAD_DEUDAS } from "../enums/cantidadDeudas.js"
import { RELACION_REFERENCIA } from "../enums/relacionReferencia.js"
import { TIPO_ARCHIVO } from "../enums/tipoArchivo.js"
import { ORIGEN_ARCHIVO } from "../enums/origenArchivo.js"
import { PERFIL_RIESGO } from "../enums/perfilRiesgo.js"

const solicitudCompletaSchema = z.object({
  id: z.string().uuid(),
  folio: z.string().regex(/^VL-\d{6}-\d{4}$/),
  montoSolicitado: z.number(),
  plazoMeses: z.number().int(),
  destino: z.enum(DESTINO_PRESTAMO),
  esPrimerCredito: z.boolean(),
  estado: z.enum(ESTADO_SOLICITUD),
  motivoRechazo: z.enum(MOTIVO_RECHAZO).nullable(),
  motivoCancelacion: z.enum(MOTIVO_CANCELACION).nullable(),
  notaOperador: z.string().nullable(),
  montoAprobado: z.number().nullable(),
  plazoAprobado: z.number().int().nullable(),
  tasaMensualAprobada: z.number().nullable(),
  comisionAperturaAprobada: z.number().nullable(),
  aprobadaAt: z.string().datetime().nullable(),
  canceladaAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

const solicitanteCompletoSchema = z.object({
  id: z.string().uuid(),
  curp: z.string().length(18),
  nombre: z.string(),
  apellidoPaterno: z.string(),
  apellidoMaterno: z.string().nullable(),
  fechaNacimiento: z.string(),
  sexo: z.enum(SEXO),
  telefono: z.string(),
  rfc: z.string().nullable(),
  correo: z.string().nullable(),
  fallecido: z.boolean(),
  bloqueadoPorFraude: z.boolean(),
})

const ingresosSchema = z.object({
  tipoActividad: z.enum(TIPO_ACTIVIDAD),
  empleador: z.string(),
  antiguedadMeses: z.number().int(),
  ingresoMensual: z.number(),
  tieneDeudas: z.boolean(),
  rangoDeudas: z.enum(CANTIDAD_DEUDAS).nullable(),
  pagoMensualDeudas: z.number().nullable(),
})

const referenciaSchema = z.object({
  id: z.string().uuid(),
  nombre: z.string(),
  telefono: z.string(),
  relacion: z.enum(RELACION_REFERENCIA),
  confirmada: z.boolean(),
  confirmadaAt: z.string().datetime().nullable(),
  notaConfirmacion: z.string().nullable(),
})

const archivoSchema = z.object({
  id: z.string().uuid(),
  tipoArchivo: z.enum(TIPO_ARCHIVO),
  origen: z.enum(ORIGEN_ARCHIVO),
  storagePath: z.string(),
  nombreOriginal: z.string().nullable(),
  tamanoBytes: z.number().int(),
  mimeType: z.string(),
  createdAt: z.string().datetime(),
})

const scoringCompletoSchema = z.object({
  v1Historial: z.number().int(),
  v2CalidadIngreso: z.number().int(),
  v3CuotaIngreso: z.number().int(),
  v4DeudasActivas: z.number().int(),
  v5GarantiaSocial: z.number().int(),
  v6Antiguedad: z.number().int(),
  v7Comportamiento: z.number().int(),
  v8Motivo: z.number().int(),
  total: z.number().int(),
  perfil: z.enum(PERFIL_RIESGO).nullable(),
  calculadoAt: z.string().datetime().nullable(),
})

const parametrosCreditoSchema = z.object({
  perfil: z.enum(PERFIL_RIESGO),
  tasaMensual: z.number(),
  montoMinimo: z.number(),
  montoMaximo: z.number(),
  comisionAperturaPorcentaje: z.number(),
})

const eventoResumenSchema = z.object({
  id: z.string().uuid(),
  tipoEvento: z.string(),
  payload: z.record(z.string(), z.unknown()),
  operadorId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
})

export const detalleResponseSchema = z.object({
  solicitud: solicitudCompletaSchema,
  solicitante: solicitanteCompletoSchema,
  ingresos: ingresosSchema.nullable(),
  referencias: z.array(referenciaSchema),
  archivos: z.array(archivoSchema),
  scoring: scoringCompletoSchema.nullable(),
  parametros_aplicables: parametrosCreditoSchema.nullable(),
  eventos: z.array(eventoResumenSchema),
})

export type DetalleResponse = z.infer<typeof detalleResponseSchema>
