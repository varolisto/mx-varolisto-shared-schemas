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
├── form/          # Schemas del formulario público de solicitud (7 pasos)
├── enums/         # Constantes de dominio (as const arrays + tipos)
├── validators/    # Validadores CLABE, CURP, RFC, teléfono mexicano
├── domain/        # Schemas del modelo de datos persistido
├── api/           # Schemas de request/response de endpoints públicos
├── admin/         # Schemas de request/response de endpoints /api/admin/*
└── helpers.ts     # Utilidad zStr()
```

## Entrypoints

| Import                                  | Contenido                                                   |
| --------------------------------------- | ----------------------------------------------------------- |
| `@varolisto/shared-schemas`             | Re-exporta todo (excepto `admin`, que se expone como namespace) |
| `@varolisto/shared-schemas/form`        | Schemas y tipos del formulario público                      |
| `@varolisto/shared-schemas/enums`       | Constantes y tipos de enums de dominio                      |
| `@varolisto/shared-schemas/validators`  | Validadores CLABE, CURP, RFC, teléfono MX                   |
| `@varolisto/shared-schemas/domain`      | Schemas del modelo persistido                               |
| `@varolisto/shared-schemas/api`         | Schemas de endpoints públicos (`/api/solicitudes`, cotización) |
| `@varolisto/shared-schemas/admin`       | Schemas de endpoints `/api/admin/solicitudes/*`             |

## Uso

### Formulario de solicitud (`/form`)

Un schema por cada paso del formulario público, más uno combinado:

```ts
import {
  paso1Schema,            // Datos personales: nombre, CURP, RFC opcional, sexo, fechaNacimiento
  paso2Schema,            // Dirección: CP, colonia, calle, municipio, estado
  paso3Schema,            // Crédito: monto (2k–20k), plazo (2–6 meses), destino
  paso4Schema,            // Situación laboral, ingresos, deudas
  paso5Schema,            // Dos referencias personales (nombre, teléfono, relación, email opcional)
  paso6Schema,            // tipoIdentificacion + archivosDeclarados (1–7 archivos)
  paso7Schema,            // aceptaPrivacidad + aceptaTerminos (literal true)
  solicitudSchema,        // Los 7 pasos combinados con .and()
  archivoDeclaradoSchema, // Shape de cada archivo en archivosDeclarados
  ACCEPTED_MIME_TYPES,    // ["image/jpeg", "image/png", "application/pdf"]
  MAX_FILE_SIZE_BYTES,    // 10 * 1024 * 1024
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
  Paso7Data,
  SolicitudCompleta,
  ArchivoDeclarado,
} from "@varolisto/shared-schemas/form"
```

> **Nota**: la CLABE no se captura en el formulario público — la ingresa el operador desde el panel admin (`PATCH /api/admin/solicitudes/:folio/datos-personales`). Por eso vive en `admin/datos-personales.ts`, no en `form/`.

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
  MOTIVO_RECHAZO,       // "score_insuficiente" | "cuota_ingreso_excesiva" | "fraude_detectado" | ... (6 motivos)
  MOTIVO_CANCELACION,   // "cliente_no_acepto_terminos" | "cliente_no_responde" | "cliente_solicito_otro_producto" | "decision_operativa"
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
  MotivoCancelacion,
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

### Schemas de API pública (`/api`)

Schemas de request y response para los endpoints públicos del backend:

```ts
import {
  crearSolicitudRequestSchema,
  crearSolicitudResponseSchema,
  generarCotizacionRequestSchema,
  generarCotizacionResponseSchema,
} from "@varolisto/shared-schemas/api"

import type {
  CrearSolicitudRequest,
  CrearSolicitudResponse,
  GenerarCotizacionRequest,
  GenerarCotizacionResponse,
} from "@varolisto/shared-schemas/api"
```

### Schemas del módulo admin (`/admin`)

Schemas de request y response para los endpoints `/api/admin/solicitudes/*` del backend (panel del operador):

```ts
import {
  // Listado y detalle
  listaFiltrosSchema,
  listaResponseSchema,
  detalleResponseSchema,
  // Scoring y propuesta
  cerrarScoringRequestSchema,
  calcularPropuestaRequestSchema,
  calcularPropuestaResponseSchema,
  emitirPropuestaRequestSchema,
  // Transiciones de estado
  aprobarRequestSchema,
  rechazarRequestSchema,
  cancelarRequestSchema,
  pedirInfoRequestSchema,
  marcarInfoRecibidaRequestSchema,
  // Modificaciones
  modificarTerminosRequestSchema,
  actualizarDatosPersonalesAdminRequestSchema,
  // Archivos del expediente
  adminUploadUrlRequestSchema,
  adminUploadUrlResponseSchema,
} from "@varolisto/shared-schemas/admin"

import type {
  ListaFiltros,
  ListaResponse,
  DetalleResponse,
  CerrarScoringRequest,
  CalcularPropuestaRequest,
  CalcularPropuestaResponse,
  AprobarRequest,
  RechazarRequest,
  CancelarRequest,
  ModificarTerminosRequest,
  ActualizarDatosPersonalesAdminRequest,
  AdminUploadUrlRequest,
  AdminUploadUrlResponse,
} from "@varolisto/shared-schemas/admin"
```

> **Nota sobre el barrel raíz**: a diferencia del resto, `admin` se expone como **namespace** desde `@varolisto/shared-schemas` (no se mezcla en el espacio de nombres global). Si importas desde el barrel raíz, usa `import { admin } from "@varolisto/shared-schemas"` y accede como `admin.aprobarRequestSchema`. Para uso normal, importa directo desde `@varolisto/shared-schemas/admin`.

### Helper (`zStr`)

```ts
import { zStr } from "@varolisto/shared-schemas"

// z.string().trim().min(1) con mensaje personalizable
const schema = z.object({ nombre: zStr("Nombre requerido") })
```

## Publicación

Este paquete usa [Changesets](https://github.com/changesets/changesets) para
gestionar el versionado y la publicación a GitHub Packages.

### Flujo de cambios

1. Realiza tu cambio en una branch de feature (`feature/...`).
2. Antes de abrir el PR, declara el cambio:
   ```bash
   pnpm changeset
   ```
   Selecciona el tipo de bump (patch / minor / major) y describe el cambio.
   Esto crea un archivo en `.changeset/` que se commitea junto con tu PR.

3. Abre el PR a `main` (vía `sandbox` si sigues ese flujo).

### Flujo de release (automático)

Cuando un PR con archivos de changeset se mergea a `main`:

1. La GitHub Action `release.yml` detecta los archivos de changeset.
2. La Action crea automáticamente un PR titulado `chore: release packages`
   que: actualiza `version` en `package.json`, actualiza `CHANGELOG.md`,
   y elimina los archivos de changeset consumidos.
3. Revisa ese PR. Al mergearlo a `main`:
4. La Action publica automáticamente el paquete a GitHub Packages.

No es necesario crear tags manualmente ni hacer push de tags.
La Action se encarga de todo a partir del merge a `main`.

### Bumping manual (excepción)

Si necesitas bumpear sin usar changesets (caso raro, p. ej. un hotfix urgente),
sigue el flujo manual histórico documentado en commits previos. Esto debe ser
excepcional.

## Requisitos

- Node.js 20+
- `zod ^4.0.0` como peer dependency

## Sincronización con el backend

> **Importante**: los enums de este paquete deben mantenerse sincronizados con los enums del `schema.prisma` del backend (`mx-varolisto-api-backend`). Cuando agregues o modifiques un enum aquí, verifica el schema equivalente en el backend. Los enums son la fuente de verdad de los valores válidos; el schema de Prisma debe reflejarlos.
