import { z } from 'zod'
import { ANTIGUEDAD } from '../enums/antiguedad.js'
import { CANTIDAD_DEUDAS } from '../enums/cantidadDeudas.js'
import { DEPENDIENTES_ECONOMICOS } from '../enums/dependientesEconomicos.js'
import { ESTADO_CIVIL } from '../enums/estadoCivil.js'
import { MONTO_TOTAL_DEUDAS } from '../enums/montoTotalDeudas.js'
import { TIPO_ACTIVIDAD } from '../enums/tipoActividad.js'
import { zStr } from '../helpers.js'

export const paso4Schema = z
  .object({
    tipoActividad: z.enum(TIPO_ACTIVIDAD, { error: () => 'Selecciona una opción' }),
    nombreEmpleadorNegocio: zStr().min(2, 'Mínimo 2 caracteres'),
    antiguedad: z.enum(ANTIGUEDAD, { error: () => 'Selecciona una opción' }),
    estadoCivil: z.enum(ESTADO_CIVIL, { error: () => 'Selecciona una opción' }),
    dependientesEconomicos: z.enum(DEPENDIENTES_ECONOMICOS, {
      error: () => 'Selecciona una opción',
    }),
    ingresoMensual: z
      .number({ error: () => 'Ingresa un ingreso válido' })
      .min(1000, 'Mínimo $1,000'),
    tieneDeudas: z.enum(['si', 'no'], { error: () => 'Selecciona una opción' }),
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
