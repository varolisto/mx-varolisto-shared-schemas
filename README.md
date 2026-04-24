# @varolisto/shared-schemas

Schemas Zod y utilidades compartidos entre las aplicaciones de Varolisto.

## Instalación

Requiere un `.npmrc` en tu proyecto con:

```
@varolisto:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TOKEN
```

Luego:

```bash
npm install @varolisto/shared-schemas
```

`zod ^4.0.0` debe estar instalado como dependencia del proyecto.

## Estructura del paquete

```
src/
├── form/          # Schemas del formulario de solicitud (6 pasos)
├── enums/         # Constantes de dominio (as const arrays + tipos)
├── validators/    # Validadores CLABE, CURP, RFC
├── domain/        # Schemas del modelo de datos persistido (WIP)
├── api/           # Schemas de request/response de endpoints (WIP)
└── helpers.ts     # Utilidad zStr()
```

## Entrypoints

| Import                            | Contenido                                      |
| --------------------------------- | ---------------------------------------------- |
| `@varolisto/shared-schemas`       | Re-exporta todo lo de abajo                    |
| `@varolisto/shared-schemas/form`  | Schemas y tipos del formulario de solicitud    |
| `@varolisto/shared-schemas/enums` | Constantes y tipos de enums de dominio         |
| `@varolisto/shared-schemas/validators` | Validadores CLABE, CURP, RFC             |
| `@varolisto/shared-schemas/domain` | Schemas del modelo persistido (WIP)           |
| `@varolisto/shared-schemas/api`   | Schemas de endpoints REST (WIP)                |

## Uso

### Formulario de solicitud (`/form`)

Un schema por cada paso del formulario, más uno combinado:

```ts
import {
  paso1Schema,      // Datos personales y dirección
  paso2Schema,      // Monto, plazo y destino del crédito
  paso3Schema,      // Situación laboral e ingresos
  paso4Schema,      // Dos referencias personales
  paso5Schema,      // CLABE y comprobantes de ingreso
  paso6Schema,      // Aceptación de términos y privacidad
  solicitudSchema,  // Los 6 pasos combinados
  ACCEPTED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
} from "@varolisto/shared-schemas/form"

// Validar un paso individual
const result = paso1Schema.safeParse(formData)

// Validar la solicitud completa
const result = solicitudSchema.safeParse(solicitudCompleta)
```

Los tipos TypeScript se infieren directamente:

```ts
import type {
  Paso1Data,
  Paso2Data,
  Paso3Data,
  Paso4Data,
  Paso5Data,
  Paso6Data,
  SolicitudCompleta,
} from "@varolisto/shared-schemas/form"
```

### Enums de dominio (`/enums`)

Arrays `as const` con sus tipos inferidos:

```ts
import {
  TIPO_ACTIVIDAD,     // "asalariado" | "independiente" | ...
  DESTINO_PRESTAMO,   // "deudas" | "hogar" | ...
  PLAZO_MESES,        // "2" | "3" | "4" | "5" | "6"
  SEXO,               // "M" | "F" | "X"
  ANTIGUEDAD,         // "menos_1" | "uno_a_dos" | "mas_2"
  CANTIDAD_DEUDAS,    // "sin_deudas" | "una_deuda" | ...
  MONTO_TOTAL_DEUDAS, // "menos_5k" | "5k_15k" | ...
  RELACION_REFERENCIA,// "familiar" | "trabajo" | "amigo" | "otro"
  // + ESTADO_SOLICITUD, ESTADO_PRESTAMO, PERFIL_RIESGO,
  //   TIPO_ARCHIVO, TIPO_PAGO, TIPO_AJUSTE (pendientes de valores)
} from "@varolisto/shared-schemas/enums"

import type {
  TipoActividad,
  DestinoPrestamo,
  PlazoMeses,
  Sexo,
  Antiguedad,
  CantidadDeudas,
  MontoTotalDeudas,
  RelacionReferencia,
} from "@varolisto/shared-schemas/enums"
```

### Validadores (`/validators`)

```ts
import { validateClabe, getBancoFromClabe } from "@varolisto/shared-schemas/validators"

validateClabe("032180000118359719")      // true | false
getBancoFromClabe("032180000118359719")  // "IXE"
```

> `validateCurp` y `validateRfc` están exportados pero aún no implementados — lanzan `Error("Not implemented")`.

### Helper (`zStr`)

```ts
import { zStr } from "@varolisto/shared-schemas"

// z.string().trim().min(1) con mensaje personalizable
const schema = z.object({ nombre: zStr("Nombre requerido") })
```

## Publicación

Se publica automáticamente en GitHub Packages al crear un tag `v*`:

```bash
# Actualizar versión en package.json, luego:
git tag v0.3.0
git push origin v0.3.0
```

## Requisitos

- Node.js 20+
- `zod ^4.0.0` como peer dependency
