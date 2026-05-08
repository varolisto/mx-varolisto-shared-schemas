---
'@varolisto/shared-schemas': patch
---

Humaniza los mensajes de validación de los schemas del formulario de solicitud (paso1–paso7) para alinearlos con el copy refresh del frontend. Sólo cambian los strings que se muestran al usuario final; las firmas de los schemas y los tipos inferidos no cambian.

Cambios principales:

- "Mínimo 2 caracteres" → "Escríbelo completo" (paso1, paso3, paso4, paso5)
- "Debes tener al menos 18 años" → "Necesitas ser mayor de edad" (paso1)
- "La CURP debe tener exactamente 18 caracteres" → "Tu CURP tiene 18 caracteres" (paso1)
- "Formato de CURP inválido" → "Revisa tu CURP, parece tener un error" (paso1)
- "Correo electrónico inválido" → "Revisa tu correo, parece tener un error" (paso1)
- "Formato de RFC inválido" → "Revisa tu RFC, parece tener un error" (paso1)
- "Ingresa un teléfono válido de 10 dígitos" → "Tu celular debe tener 10 dígitos" (paso1, paso5)
- "Formato inválido" (fecha) → "Revisa el formato de la fecha" (paso1)
- "El CP debe tener 5 dígitos" → "El CP tiene 5 dígitos" (paso3)
- "Requerido" / "Campo requerido" → "Falta este dato" / "Necesitamos el número exterior" (paso3)
- "Mínimo $1,000" → "El ingreso debe ser de al menos $1,000" (paso4)
- "Indica cuántas deudas tienes" / "Indica el monto total de tus deudas" / "Indica tu pago mensual" → "Falta este dato" (paso4)
- "Solo se permiten letras" → "Sólo letras, sin números ni símbolos" (paso5)
- "Correo inválido" → "Revisa el correo, parece tener un error" (paso5)
- "El teléfono de la segunda referencia no puede ser igual al primero" → "Este teléfono es el mismo que el del Contacto 1" (paso5)
- "Tipo de archivo no permitido" → "Sólo se permiten JPG, PNG o PDF" (paso6)
- "Debes subir la fotografía de tu identificación oficial" → "Falta subir tu identificación oficial" (paso6)
- "Debes aceptar el Aviso de Privacidad" → "Necesitamos tu autorización para continuar" (paso7)
- "Debes aceptar los Términos y Condiciones" → "Necesitamos que aceptes los términos para continuar" (paso7)

Mensajes técnicos del módulo `validators/` (devueltos como `reason` por `validateX`) no se tocan — los consume el backend para logs y scoring, no se muestran al usuario.
