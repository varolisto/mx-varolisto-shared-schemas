/**
 * Reglas de capas para @varolisto/shared-schemas.
 *
 * Topología (de menos a más dependiente):
 *   Capa 0 (hojas):     enums/        helpers.ts
 *   Capa 1 (puro):      validators/   ── (nada)
 *   Capa 2 (entidades): domain/       ── enums, helpers
 *   Capa 3 (wire-form): form/         ── validators, enums, helpers
 *   Capa 4 (contratos): api/          ── form, domain, enums, helpers
 *   Capa 5 (admin):     admin/        ── domain, validators, enums, helpers
 */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "no-orphans",
      severity: "warn",
      comment: "Files that nobody imports — likely dead code.",
      from: {
        orphan: true,
        pathNot: [
          "(^|/)index\\.ts$",
          "\\.test\\.ts$",
          "src/__fixtures__/",
          "\\.d\\.ts$",
        ],
      },
      to: {},
    },
    {
      name: "enums-leaf",
      severity: "error",
      comment: "enums/ es hoja — no puede importar de capas superiores.",
      from: { path: "^src/enums/" },
      to: { path: "^src/(form|validators|domain|api|admin)/" },
    },
    {
      name: "helpers-leaf",
      severity: "error",
      comment: "helpers.ts es hoja — no puede importar de capas superiores.",
      from: { path: "^src/helpers\\.ts$" },
      to: { path: "^src/(form|validators|domain|api|admin)/" },
    },
    {
      name: "validators-leaf",
      severity: "error",
      comment: "validators/ es hoja — funciones puras sin dependencias internas.",
      from: { path: "^src/validators/" },
      to: { path: "^src/(form|domain|api|admin)/" },
    },
    {
      name: "domain-no-form-api-admin",
      severity: "error",
      comment: "domain/ representa entidades persistidas; no depende del wire format ni de admin.",
      from: { path: "^src/domain/" },
      to: { path: "^src/(form|api|admin)/" },
    },
    {
      name: "form-no-domain-api-admin",
      severity: "error",
      comment: "form/ es wire format del wizard; el mapeo a entity vive en backend.",
      from: { path: "^src/form/" },
      to: { path: "^src/(domain|api|admin)/" },
    },
    {
      name: "admin-no-form-api",
      severity: "error",
      comment: "admin/ opera sobre entidades, no usa el wire format del wizard ni endpoints públicos.",
      from: { path: "^src/admin/" },
      to: { path: "^src/(form|api)/" },
    },
    {
      name: "api-no-admin",
      severity: "error",
      comment: "api/ son contratos públicos; admin/ es interno y no se mezcla.",
      from: { path: "^src/api/" },
      to: { path: "^src/admin/" },
    },
    {
      name: "no-test-import-from-prod",
      severity: "error",
      comment: "Código de producción no debe importar de archivos *.test.ts.",
      from: { pathNot: "\\.test\\.ts$" },
      to: { path: "\\.test\\.ts$" },
    },
  ],
  options: {
    tsConfig: { fileName: "tsconfig.json" },
    doNotFollow: { path: "node_modules" },
    includeOnly: "^src/",
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      mainFields: ["module", "main", "types"],
    },
    reporterOptions: {
      text: { highlightFocused: true },
    },
  },
}
