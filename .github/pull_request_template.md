## Descripción

<!-- ¿Qué cambia y por qué? -->

## Checklist

- [ ] Tests añadidos o actualizados para todos los cambios de lógica
- [ ] `pnpm verify` pasa en local (typecheck + lint + depcheck + test:coverage + build)
- [ ] Si hay cambio en API pública: changeset ejecutado (`pnpm changeset`)
- [ ] Si hay cambio en enum: PR equivalente abierto en `mx-varolisto-api-backend` (sync Prisma)
- [ ] Reglas de capas respetadas (`pnpm depcheck` sin violaciones)
