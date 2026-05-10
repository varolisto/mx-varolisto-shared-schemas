---
'@varolisto/shared-schemas': minor
---

admin/calcular-propuesta: añadir campos `comision_apertura_monto` e `iva_comision` al response schema. Ambos son montos en MXN — el primero es la comisión de apertura absoluta (sin IVA) y el segundo es el IVA aplicado sobre esa comisión. Necesarios para reflejar correctamente que el IVA de la comisión se descuenta del depósito al cliente.
