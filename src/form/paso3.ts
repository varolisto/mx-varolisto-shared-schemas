import { z } from 'zod'
import { DIRECCION_NUMERO_MAX_LENGTH, DIRECCION_TEXTO_MAX_LENGTH } from '../constants.js'
import { ANIOS_VIVIENDO } from '../enums/aniosViviendo.js'
import { TIPO_VIVIENDA } from '../enums/tipoVivienda.js'
import { enumSelecciona, zStr } from '../helpers.js'

export const paso3Schema = z.object({
  codigoPostal: zStr().regex(/^\d{5}$/, 'El CP debe tener 5 dígitos'),
  colonia: zStr('Selecciona una colonia')
    .min(1, 'Selecciona una colonia')
    .max(DIRECCION_TEXTO_MAX_LENGTH, 'Colonia demasiado larga'),
  municipio: zStr()
    .min(2, 'Mínimo 2 caracteres')
    .max(DIRECCION_TEXTO_MAX_LENGTH, 'Municipio demasiado largo'),
  estado: zStr().min(1, 'Requerido').max(100),
  ciudad: z.string().trim().max(DIRECCION_TEXTO_MAX_LENGTH).optional(),
  calle: zStr()
    .min(2, 'Mínimo 2 caracteres')
    .max(DIRECCION_TEXTO_MAX_LENGTH, 'Calle demasiado larga'),
  numeroExterior: zStr('Campo requerido')
    .min(1, 'Campo requerido')
    .max(DIRECCION_NUMERO_MAX_LENGTH, 'Número demasiado largo'),
  numeroInterior: z.string().trim().max(DIRECCION_NUMERO_MAX_LENGTH).optional(),
  aniosViviendo: enumSelecciona(ANIOS_VIVIENDO),
  tipoVivienda: enumSelecciona(TIPO_VIVIENDA),
})

export type Paso3Data = z.infer<typeof paso3Schema>
