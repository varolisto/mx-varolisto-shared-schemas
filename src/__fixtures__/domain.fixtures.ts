import { VALID_CURP } from "./curps.js"

export const validSolicitanteDomain = {
  curp: VALID_CURP,
  nombre: "Juan",
  apellidoPaterno: "Pérez",
  apellidoMaterno: "García",
  fechaNacimiento: new Date("1990-01-01"),
  sexo: "M" as const,
  telefono: "5512345678",
  rfc: "MARJ800101ABC",
  correo: "juan.perez@example.com",
  fallecido: false,
}

export const validSolicitudDomain = {
  folio: "VL-202601-0042",
  montoSolicitado: 10000,
  plazoMeses: 4,
  destino: "capital_trabajo" as const,
  destinoOtro: null,
  esPrimerCredito: true,
  estado: "recibida" as const,
  metadata: {},
}

export const validDireccionDomain = {
  calle: "Av. Insurgentes",
  numeroExt: "123",
  numeroInt: "4B",
  cp: "06600",
  colonia: "Roma Norte",
  municipio: "Cuauhtémoc",
  estado: "Ciudad de México",
  esVigente: true,
}

export const validIngresoDomain = {
  tipoActividad: "empleado_formal" as const,
  empleador: "ACME S.A. de C.V.",
  antiguedadMeses: 24,
  ingresoMensual: 25000,
  tieneDeudas: false,
  rangoDeudas: null,
  pagoMensualDeudas: null,
}

export const validReferenciaDomain = {
  nombre: "María López",
  telefono: "8112345678",
  relacion: "familiar" as const,
  confirmada: false,
}

export const validArchivoDomain = {
  tipoArchivo: "ine_frente" as const,
  origen: "solicitante_formulario" as const,
  storagePath: "uploads/solicitudes/VL-202601-0042/ine-frente.jpg",
  nombreOriginal: "ine-frente.jpg",
  tamanoBytes: 524288,
  mimeType: "image/jpeg",
}

export const validScoringDomain = {
  v1Historial: 20,
  v2CalidadIngreso: 15,
  v3CuotaIngreso: 10,
  v4DeudasActivas: 12,
  v5GarantiaSocial: 8,
  v6Antiguedad: 8,
  v7Comportamiento: 4,
  v8Motivo: 3,
  total: 80,
  perfil: "A" as const,
}
