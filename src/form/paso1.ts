import { z } from 'zod'
import { SEXO } from '../enums/sexo.js'
import { zStr } from '../helpers.js'
import { isValidCurp } from '../validators/curp.js'
import { isValidRfc } from '../validators/rfc.js'
import { isValidTelefonoMx } from '../validators/telefonoMx.js'

export const paso1Schema = z.object({
  nombre: zStr().min(2, 'Mínimo 2 caracteres'),
  apellidoPaterno: zStr().min(2, 'Mínimo 2 caracteres'),
  apellidoMaterno: zStr().min(2, 'Mínimo 2 caracteres'),
  sexo: z.enum(SEXO, { error: () => 'Selecciona una opción' }),
  fechaNacimiento: zStr('Selecciona una fecha')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido')
    .refine((val) => {
      const birth = new Date(`${val}T00:00:00`)
      const min18 = new Date()
      min18.setFullYear(min18.getFullYear() - 18)
      return birth <= min18
    }, 'Debes tener al menos 18 años')
    .refine((val) => {
      const birth = new Date(`${val}T00:00:00`)
      const max100 = new Date()
      max100.setFullYear(max100.getFullYear() - 100)
      return birth >= max100
    }, 'Fecha de nacimiento inválida'),
  curp: zStr()
    .length(18, 'La CURP debe tener exactamente 18 caracteres')
    .refine((val) => val.length !== 18 || isValidCurp(val), 'Formato de CURP inválido'),
  email: zStr().email({ error: 'Correo electrónico inválido' }),
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
      'Formato de RFC inválido',
    ),
  telefono: zStr().refine(
    (val) => val.length < 1 || isValidTelefonoMx(val),
    'Ingresa un teléfono válido de 10 dígitos',
  ),
})

export type Paso1Data = z.infer<typeof paso1Schema>
