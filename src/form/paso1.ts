import { z } from 'zod'
import { APELLIDO_MAX_LENGTH, NOMBRE_MAX_LENGTH } from '../constants.js'
import { SEXO } from '../enums/sexo.js'
import { enumSelecciona, zStr } from '../helpers.js'
import { isValidCurp } from '../validators/curp.js'
import { isValidRfc } from '../validators/rfc.js'
import { isValidTelefonoMx } from '../validators/telefonoMx.js'

export const paso1Schema = z.object({
  nombre: zStr().min(2, 'Escríbelo completo').max(NOMBRE_MAX_LENGTH, 'Nombre demasiado largo'),
  apellidoPaterno: zStr()
    .min(2, 'Escríbelo completo')
    .max(APELLIDO_MAX_LENGTH, 'Apellido demasiado largo'),
  apellidoMaterno: zStr()
    .min(2, 'Escríbelo completo')
    .max(APELLIDO_MAX_LENGTH, 'Apellido demasiado largo'),
  sexo: enumSelecciona(SEXO),
  fechaNacimiento: zStr('Selecciona una fecha')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Revisa el formato de la fecha')
    .refine((val) => {
      const birth = new Date(`${val}T00:00:00`)
      const min18 = new Date()
      min18.setFullYear(min18.getFullYear() - 18)
      return birth <= min18
    }, 'Necesitas ser mayor de edad')
    .refine((val) => {
      const birth = new Date(`${val}T00:00:00`)
      const max100 = new Date()
      max100.setFullYear(max100.getFullYear() - 100)
      return birth >= max100
    }, 'Fecha de nacimiento inválida'),
  curp: zStr()
    .length(18, 'Tu CURP tiene 18 caracteres')
    .refine(
      (val) => val.length !== 18 || isValidCurp(val),
      'Revisa tu CURP, parece tener un error',
    ),
  email: zStr().email({ error: 'Revisa tu correo, parece tener un error' }),
  rfc: z
    .string()
    .trim()
    .optional()
    .refine(
      (val: string | undefined) => !val || val.length === 12 || val.length === 13,
      'El RFC debe tener 12 o 13 caracteres',
    )
    .refine(
      (val: string | undefined) =>
        !val || (val.length !== 12 && val.length !== 13) || isValidRfc(val),
      'Revisa tu RFC, parece tener un error',
    ),
  telefono: zStr().refine(
    (val) => val.length < 1 || isValidTelefonoMx(val),
    'Tu celular debe tener 10 dígitos',
  ),
})

export type Paso1Data = z.infer<typeof paso1Schema>
