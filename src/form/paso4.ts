import { z } from 'zod'
import { EMPLEADOR_MAX_LENGTH } from '../constants.js'
import { ANTIGUEDAD } from '../enums/antiguedad.js'
import { CANTIDAD_DEUDAS } from '../enums/cantidadDeudas.js'
import { DEPENDIENTES_ECONOMICOS } from '../enums/dependientesEconomicos.js'
import { ESTADO_CIVIL } from '../enums/estadoCivil.js'
import { MONTO_TOTAL_DEUDAS } from '../enums/montoTotalDeudas.js'
import { TIPO_ACTIVIDAD } from '../enums/tipoActividad.js'
import { enumSelecciona, zStr } from '../helpers.js'

export const paso4Schema = z
  .object({
    tipoActividad: enumSelecciona(TIPO_ACTIVIDAD),
    nombreEmpleadorNegocio: zStr()
      .min(2, 'Mínimo 2 caracteres')
      .max(EMPLEADOR_MAX_LENGTH, 'Nombre demasiado largo'),
    antiguedad: enumSelecciona(ANTIGUEDAD),
    estadoCivil: enumSelecciona(ESTADO_CIVIL),
    dependientesEconomicos: enumSelecciona(DEPENDIENTES_ECONOMICOS),
    ingresoMensual: z
      .number({ error: () => 'Ingresa un ingreso válido' })
      .min(1000, 'Mínimo $1,000'),
    tieneDeudas: enumSelecciona(['si', 'no'] as const),
    cantidadDeudas: z.enum(CANTIDAD_DEUDAS).optional(),
    montoTotalDeudas: z.enum(MONTO_TOTAL_DEUDAS).optional(),
    pagoMensualDeudas: z.number().min(0).optional(),
  })
  .refine((data) => data.tieneDeudas !== 'si' || data.cantidadDeudas !== undefined, {
    message: 'Indica cuántas deudas tienes',
    path: ['cantidadDeudas'],
  })
  .refine((data) => data.tieneDeudas !== 'si' || data.montoTotalDeudas !== undefined, {
    message: 'Indica el monto total de tus deudas',
    path: ['montoTotalDeudas'],
  })
  .refine((data) => data.tieneDeudas !== 'si' || data.pagoMensualDeudas !== undefined, {
    message: 'Indica tu pago mensual',
    path: ['pagoMensualDeudas'],
  })

export type Paso4Data = z.infer<typeof paso4Schema>
