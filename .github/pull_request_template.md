## Resumen

<!-- 1-3 bullets sobre qué cambia y por qué. -->

## Tipo de cambio

- [ ] Nuevo schema / refine / validador
- [ ] Modificación de schema existente (potencial breaking)
- [ ] Bug fix
- [ ] Refactor / housekeeping
- [ ] Documentación / tests

## Checklist

- [ ] Tests añadidos o actualizados (o explico abajo por qué no aplica).
- [ ] `pnpm verify` pasa local (`typecheck → depcheck → test:coverage → build`).
- [ ] Si hay cambio público: `pnpm changeset` ejecutado con la severidad correcta (patch / minor / major).
- [ ] Reglas de capas respetadas (`pnpm depcheck` verde).
- [ ] Si es **breaking**: notas qué consumidores hay que actualizar y en qué orden.

## Cambios en API pública

<!-- ¿Qué entry point cambia? ¿Qué símbolo nuevo / renombrado / removido? Si nada cambia, escribe "ninguno". -->

## Plan de prueba

<!-- Cómo verificar manualmente. Si solo es cambio de tests/docs, deja "N/A". -->
