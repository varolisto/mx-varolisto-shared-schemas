---
"@varolisto/shared-schemas": patch
---

Corrige inferencia de tipos en `paso5Schema` (`Paso5Data`).

El refactor de PR #28 introdujo el helper `referenciaFormFields(prefix)` que construía las claves del schema con template literals computados (`` [`${prefix}Nombre`] ``). TypeScript no puede inferir claves literales a partir de plantillas dinámicas, así que el tipo resultante perdía precisión: `ref1Nombre`, `ref1Telefono`, `ref2Nombre` y `ref2Telefono` quedaban tipados como `string | undefined` en lugar de `string`. Esto rompía la compilación en consumidores (backend, frontend) que asignaban `Paso5Data` a payloads con campos requeridos.

Reemplaza el helper por la composición explícita del objeto Zod con claves literales (los validadores comunes se conservan como constantes locales). El schema en runtime es idéntico — solo cambia el tipo inferido.
