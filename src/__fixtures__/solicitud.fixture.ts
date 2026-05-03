import { VALID_CURP } from './curps.js'
import { VALID_RFC_PERSONA_FISICA } from './rfcs.js'
import { VALID_TELEFONO, VALID_TELEFONO_OTHER } from './telefonos.js'

/**
 * Fixture canónico válido para solicitudSchema (paso1+...+paso7).
 * Mantiene la fecha de nacimiento muy en el pasado pero NO mayor a 100 años,
 * para que los refines de paso1 (18-100 años) no se rompan con el paso del tiempo.
 */
export const validSolicitudCompleta = {
  // --- paso1: datos personales ---
  nombre: 'Juan',
  apellidoPaterno: 'Pérez',
  apellidoMaterno: 'García',
  sexo: 'M' as const,
  fechaNacimiento: '1990-01-01',
  curp: VALID_CURP,
  email: 'juan.perez@example.com',
  rfc: VALID_RFC_PERSONA_FISICA,
  telefono: VALID_TELEFONO,

  // --- paso2: crédito ---
  montoSolicitado: 10000,
  plazoMeses: '4' as const,
  destinoPrestamo: 'capital_trabajo' as const,

  // --- paso3: dirección + vivienda ---
  codigoPostal: '06600',
  colonia: 'Roma Norte',
  municipio: 'Cuauhtémoc',
  estado: 'Ciudad de México',
  ciudad: 'Ciudad de México',
  calle: 'Av. Insurgentes',
  numeroExterior: '123',
  numeroInterior: '4B',
  aniosViviendo: 'mas_de_5' as const,
  tipoVivienda: 'propia' as const,

  // --- paso4: situación laboral, civil, ingresos, deudas ---
  tipoActividad: 'empleado_formal' as const,
  nombreEmpleadorNegocio: 'ACME S.A. de C.V.',
  antiguedad: 'mas_2' as const,
  estadoCivil: 'casado' as const,
  dependientesEconomicos: 'dos' as const,
  ingresoMensual: 25000,
  tieneDeudas: 'no' as const,
  cantidadDeudas: undefined,
  montoTotalDeudas: undefined,
  pagoMensualDeudas: undefined,

  // --- paso5: referencias ---
  ref1Nombre: 'María López',
  ref1Telefono: VALID_TELEFONO_OTHER,
  ref1Relacion: 'familiar' as const,
  ref1Email: 'maria.lopez@example.com',
  ref2Nombre: 'Pedro Sánchez',
  ref2Telefono: '5598765432',
  ref2Relacion: 'amigo' as const,
  ref2Email: '',

  // --- paso6: identificación + archivos ---
  sessionUuid: '550e8400-e29b-41d4-a716-446655440000',
  tipoIdentificacion: 'ine' as const,
  archivosDeclarados: [
    {
      tipoArchivo: 'ine_frente' as const,
      nombreOriginal: 'ine-frente.jpg',
      mimeType: 'image/jpeg',
      tamanoBytes: 524288,
    },
    {
      tipoArchivo: 'ine_reverso' as const,
      nombreOriginal: 'ine-reverso.jpg',
      mimeType: 'image/jpeg',
      tamanoBytes: 491520,
    },
    {
      tipoArchivo: 'comprobante_ingreso' as const,
      nombreOriginal: 'recibo-nomina.pdf',
      mimeType: 'application/pdf',
      tamanoBytes: 1048576,
    },
  ],

  // --- paso7: consent ---
  aceptaPrivacidad: true as const,
  aceptaTerminos: true as const,
}
