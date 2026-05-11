import { z } from 'zod'
import { EMPLEADOR_MAX_LENGTH, GASTO_MENSUAL_MIN } from '../constants.js'
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
      .min(2, 'Escríbelo completo')
      .max(EMPLEADOR_MAX_LENGTH, 'Nombre demasiado largo'),
    antiguedad: enumSelecciona(ANTIGUEDAD),
    estadoCivil: enumSelecciona(ESTADO_CIVIL),
    dependientesEconomicos: enumSelecciona(DEPENDIENTES_ECONOMICOS),
    ingresoMensual: z
      .number({ error: () => 'Ingresa un ingreso válido' })
      .min(1000, 'El ingreso debe ser de al menos $1,000'),
    gastoMensual: z
      .number({ error: () => 'Ingresa un gasto válido' })
      .min(GASTO_MENSUAL_MIN, 'El gasto no puede ser negativo'),
    tieneDeudas: enumSelecciona(['si', 'no'] as const),
    cantidadDeudas: z.enum(CANTIDAD_DEUDAS).optional(),
    montoTotalDeudas: z.enum(MONTO_TOTAL_DEUDAS).optional(),
    pagoMensualDeudas: z.number().min(0).optional(),
  })
  .refine((data) => data.gastoMensual <= data.ingresoMensual, {
    message: 'Tu gasto no puede ser mayor que tu ingreso',
    path: ['gastoMensual'],
  })
  .refine((data) => data.tieneDeudas !== 'si' || data.cantidadDeudas !== undefined, {
    message: 'Falta este dato',
    path: ['cantidadDeudas'],
  })
  .refine((data) => data.tieneDeudas !== 'si' || data.montoTotalDeudas !== undefined, {
    message: 'Falta este dato',
    path: ['montoTotalDeudas'],
  })
  .refine((data) => data.tieneDeudas !== 'si' || data.pagoMensualDeudas !== undefined, {
    message: 'Falta este dato',
    path: ['pagoMensualDeudas'],
  })

export type Paso4Data = z.infer<typeof paso4Schema>
