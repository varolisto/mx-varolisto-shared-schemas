# @varolisto/shared-schemas

Schemas Zod y utilidades CLABE compartidos entre las aplicaciones de Varolisto.

## Instalación

Requiere un `.npmrc` en tu proyecto con:

```
@varolisto:registry=https://npm.pkg.github.com
```

Luego:

```bash
npm install @varolisto/shared-schemas
```

## Uso

### Schemas del formulario de solicitud

Hay un schema por cada paso del formulario, más uno combinado:

```ts
import {
  paso1Schema,   // Datos personales y dirección
  paso2Schema,   // Monto, plazo y destino del crédito
  paso3Schema,   // Situación laboral e ingresos
  paso4Schema,   // Dos referencias personales
  paso5Schema,   // CLABE y comprobantes de ingreso
  paso6Schema,   // Aceptación de términos y privacidad
  solicitudSchema, // Los 6 pasos combinados
} from "@varolisto/shared-schemas/schemas"

// Validar un paso individual
const result = paso1Schema.safeParse(formData)

// Validar la solicitud completa
const result = solicitudSchema.safeParse(solicitudCompleta)
```

Los tipos TypeScript se infieren directamente:

```ts
import type { Paso1Data, SolicitudCompleta } from "@varolisto/shared-schemas/schemas"
```

### Validación CLABE

```ts
import { validateClabe, getBancoFromClabe } from "@varolisto/shared-schemas/clabe"

validateClabe("032180000118359719") // true | false
getBancoFromClabe("032180000118359719") // "IXE"
```

## Publicación

Se publica automáticamente en GitHub Packages al crear un tag `v*`:

```bash
# Actualizar versión en package.json, luego:
git tag v0.2.0
git push origin v0.2.0
```

## Requisitos

- Node.js 20+
- `zod ^4.0.0` como peer dependency
