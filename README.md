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
├── validators/    # Validadores CLABE, CURP, RFC, teléfono mexicano
├── domain/        # Schemas del modelo de datos persistido
├── api/           # Schemas de request/response de endpoints
└── helpers.ts     # Utilidad zStr()
```

## Entrypoints

| Import                                  | Contenido                                   |
| --------------------------------------- | ------------------------------------------- |
| `@varolisto/shared-schemas`             | Re-exporta todo lo de abajo                 |
| `@varolisto/shared-schemas/form`        | Schemas y tipos del formulario de solicitud |
| `@varolisto/shared-schemas/enums`       | Constantes y tipos de enums de dominio      |
| `@varolisto/shared-schemas/validators`  | Validadores CLABE, CURP, RFC, teléfono MX   |
| `@varolisto/shared-schemas/domain`      | Schemas del modelo persistido               |
| `@varolisto/shared-schemas/api`         | Schemas de endpoints REST                   |

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

Arrays `as const` con sus tipos inferidos. Todos los enums están poblados a partir del Modelo de Datos v1.2:

```ts
import {
  TIPO_ACTIVIDAD,       // "asalariado" | "independiente" | ...
  DESTINO_PRESTAMO,     // "deudas" | "hogar" | ...
  PLAZO_MESES,          // "2" | "3" | "4" | "5" | "6"
  SEXO,                 // "M" | "F" | "X"
  ANTIGUEDAD,           // "menos_1" | "uno_a_dos" | "mas_2"
  CANTIDAD_DEUDAS,      // "sin_deudas" | "una_deuda" | ...
  MONTO_TOTAL_DEUDAS,   // "menos_5k" | "5k_15k" | ...
  RELACION_REFERENCIA,  // "familiar" | "trabajo" | "amigo" | "otro"
  ESTADO_SOLICITUD,     // "recibida" | "en_revision" | "pendiente_info" | "aprobada" | "rechazada" | "cancelada"
  ESTADO_PRESTAMO,      // "activo" | "atrasado" | "moratorio" | ... (11 estados)
  PERFIL_RIESGO,        // "A" | "B" | "C" | "D"
  TIPO_ARCHIVO,         // "comprobante_ingreso" | "ine_frente" | ... (9 tipos)
  TIPO_PAGO,            // "cuota_regular" | "cuota_con_excedente" | ... (5 tipos)
  TIPO_AJUSTE,          // "condonacion_parcial" | "reverso_pago" | "extension_plazo"
  NUMERO_CREDITO,       // "primer" | "segundo" | "tercero_mas"
  CONCEPTO_CONDONABLE,  // "moratorios" | "interes_ordinario"
  ORIGEN_ARCHIVO,       // "operador" | "solicitante_formulario" | ... (5 orígenes)
  MOTIVO_RECHAZO,       // "score_insuficiente" | "cuota_ingreso_excesiva" | ... (5 motivos)
  PROPOSITO_TOKEN,      // "subir_documentos"
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
  EstadoSolicitud,
  EstadoPrestamo,
  PerfilRiesgo,
  TipoArchivo,
  TipoPago,
  TipoAjuste,
  NumeroCredito,
  ConceptoCondonable,
  OrigenArchivo,
  MotivoRechazo,
  PropositoToken,
} from "@varolisto/shared-schemas/enums"
```

### Validadores (`/validators`)

Los validadores de CURP, RFC y teléfono devuelven un objeto `{ valid: boolean, reason? }` con razón de fallo. `validateClabe` mantiene su API `boolean` por compatibilidad.

```ts
import {
  validateClabe,
  getBancoFromClabe,
  validateCurp,
  isValidCurp,
  validateRfc,
  isValidRfc,
  validateTelefonoMx,
  isValidTelefonoMx,
} from "@varolisto/shared-schemas/validators"

validateClabe("032180000118359719")      // true | false
getBancoFromClabe("032180000118359719")  // "IXE"

validateCurp("LOAM800101HDFPRT09")
// { valid: true } | { valid: false, reason: "longitud_incorrecta" | "caracteres_no_permitidos" | "formato_invalido" }

validateRfc("LOAM800101AB1")
// { valid: true, tipo: "persona_fisica" } | { valid: false, reason: "..." }

validateTelefonoMx("5512345678")
// { valid: true, normalized: "5512345678" } | { valid: false, reason: "tipo_incorrecto" | "longitud_incorrecta" | "formato_invalido" }
```

Los helpers `isValidCurp`, `isValidRfc` e `isValidTelefonoMx` devuelven `boolean` directamente para usar en refinements de Zod.

### Schemas de dominio (`/domain`)

Schemas del modelo de datos tal como persiste en la base de datos:

```ts
import {
  solicitanteDomainSchema,
  direccionDomainSchema,
  ingresoDomainSchema,
  referenciaDomainSchema,
  solicitudDomainSchema,
  scoringDomainSchema,
  archivoDomainSchema,
} from "@varolisto/shared-schemas/domain"

import type {
  SolicitanteDomain,
  DireccionDomain,
  IngresoDomain,
  ReferenciaDomain,
  SolicitudDomain,
  ScoringDomain,
  ArchivoDomain,
} from "@varolisto/shared-schemas/domain"
```

### Schemas de API (`/api`)

Schemas de request y response para los endpoints REST:

```ts
import {
  crearSolicitudRequestSchema,
  crearSolicitudResponseSchema,
} from "@varolisto/shared-schemas/api"

import type {
  CrearSolicitudRequest,
  CrearSolicitudResponse,
} from "@varolisto/shared-schemas/api"
```

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

## Sincronización con el backend

> **Importante**: los enums de este paquete deben mantenerse sincronizados con los enums del `schema.prisma` del backend (`mx-varolisto-api-backend`). Cuando agregues o modifiques un enum aquí, verifica el schema equivalente en el backend. Los enums son la fuente de verdad de los valores válidos; el schema de Prisma debe reflejarlos.
