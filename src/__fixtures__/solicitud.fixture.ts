import { VALID_CLABE_STP } from "./clabes.js"
import { VALID_CURP } from "./curps.js"
import { VALID_RFC_PERSONA_FISICA } from "./rfcs.js"
import { VALID_TELEFONO, VALID_TELEFONO_OTHER } from "./telefonos.js"

/**
 * Fixture canónico válido para solicitudSchema (paso1+...+paso6).
 * Mantiene la fecha de nacimiento muy en el pasado para que el refine de
 * mayoría de edad no se rompa con el paso del tiempo.
 */
export const validSolicitudCompleta = {
  // --- paso1 ---
  nombre: "Juan",
  apellidoPaterno: "Pérez",
  apellidoMaterno: "García",
  sexo: "M" as const,
  fechaNacimiento: "1990-01-01",
  curp: VALID_CURP,
  email: "juan.perez@example.com",
  rfc: VALID_RFC_PERSONA_FISICA,
  telefono: VALID_TELEFONO,
  codigoPostal: "06600",
  colonia: "Roma Norte",
  municipio: "Cuauhtémoc",
  calle: "Av. Insurgentes",
  numeroExterior: "123",
  numeroInterior: "4B",

  // --- paso2 ---
  montoSolicitado: 10000,
  plazoMeses: "4" as const,
  primerCredito: "si" as const,
  destinoPrestamo: "capital_trabajo" as const,
  destinoOtro: undefined,

  // --- paso3 ---
  tipoActividad: "empleado_formal" as const,
  nombreEmpleadorNegocio: "ACME S.A. de C.V.",
  antiguedad: "mas_2" as const,
  ingresoMensual: 25000,
  tieneDeudas: "no" as const,
  cantidadDeudas: undefined,
  montoTotalDeudas: undefined,
  pagoMensualDeudas: undefined,

  // --- paso4 ---
  ref1Nombre: "María López",
  ref1Telefono: VALID_TELEFONO_OTHER,
  ref1Relacion: "familiar" as const,
  ref1Email: "maria.lopez@example.com",
  ref2Nombre: "Pedro Sánchez",
  ref2Telefono: "5598765432",
  ref2Relacion: "amigo" as const,
  ref2Email: "",

  // --- paso5 ---
  sessionUuid: "550e8400-e29b-41d4-a716-446655440000",
  archivosDeclarados: [
    {
      tipoArchivo: "ine_frente" as const,
      nombreOriginal: "ine-frente.jpg",
      mimeType: "image/jpeg",
      tamanoBytes: 524288,
    },
    {
      tipoArchivo: "comprobante_ingreso" as const,
      nombreOriginal: "recibo-nomina.pdf",
      mimeType: "application/pdf",
      tamanoBytes: 1048576,
    },
  ],
  clabe: VALID_CLABE_STP,

  // --- paso6 ---
  aceptaPrivacidad: true as const,
  aceptaTerminos: true as const,
}
