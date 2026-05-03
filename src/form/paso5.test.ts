import { describe, it, expect } from "vitest"
import {
  paso5Schema,
  archivoDeclaradoSchema,
  ACCEPTED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
} from "./paso5.js"
import { VALID_CLABE_STP } from "../__fixtures__/clabes.js"

const validArchivo = {
  tipoArchivo: "ine_frente" as const,
  nombreOriginal: "ine-frente.jpg",
  mimeType: "image/jpeg",
  tamanoBytes: 524288,
}

const validPaso5 = {
  sessionUuid: "550e8400-e29b-41d4-a716-446655440000",
  archivosDeclarados: [validArchivo],
  clabe: VALID_CLABE_STP,
}

describe("archivoDeclaradoSchema", () => {
  it("acepta un archivo válido", () => {
    expect(archivoDeclaradoSchema.safeParse(validArchivo).success).toBe(true)
  })

  it("rechaza tipoArchivo fuera del enum", () => {
    expect(
      archivoDeclaradoSchema.safeParse({
        ...validArchivo,
        tipoArchivo: "selfie",
      }).success,
    ).toBe(false)
  })

  it("rechaza tamanoBytes <= 0", () => {
    expect(
      archivoDeclaradoSchema.safeParse({ ...validArchivo, tamanoBytes: 0 })
        .success,
    ).toBe(false)
  })

  it("rechaza tamanoBytes no entero", () => {
    expect(
      archivoDeclaradoSchema.safeParse({ ...validArchivo, tamanoBytes: 1.5 })
        .success,
    ).toBe(false)
  })

  it("rechaza nombreOriginal vacío", () => {
    expect(
      archivoDeclaradoSchema.safeParse({ ...validArchivo, nombreOriginal: "" })
        .success,
    ).toBe(false)
  })

  it("rechaza nombreOriginal con más de 255 caracteres", () => {
    expect(
      archivoDeclaradoSchema.safeParse({
        ...validArchivo,
        nombreOriginal: "a".repeat(256),
      }).success,
    ).toBe(false)
  })
})

describe("paso5Schema", () => {
  it("acepta un paso5 válido con un archivo", () => {
    expect(paso5Schema.safeParse(validPaso5).success).toBe(true)
  })

  it("acepta hasta 5 archivos", () => {
    expect(
      paso5Schema.safeParse({
        ...validPaso5,
        archivosDeclarados: Array(5).fill(validArchivo),
      }).success,
    ).toBe(true)
  })

  it("rechaza array de archivos vacío (mínimo 1)", () => {
    expect(
      paso5Schema.safeParse({ ...validPaso5, archivosDeclarados: [] }).success,
    ).toBe(false)
  })

  it("rechaza más de 5 archivos", () => {
    expect(
      paso5Schema.safeParse({
        ...validPaso5,
        archivosDeclarados: Array(6).fill(validArchivo),
      }).success,
    ).toBe(false)
  })

  it("rechaza una CLABE inválida", () => {
    expect(
      paso5Schema.safeParse({ ...validPaso5, clabe: "646180157000000000" })
        .success,
    ).toBe(false)
  })

  it("rechaza un sessionUuid no-UUID", () => {
    expect(
      paso5Schema.safeParse({ ...validPaso5, sessionUuid: "not-a-uuid" })
        .success,
    ).toBe(false)
  })
})

describe("paso5 — gap detectado: MAX_FILE_SIZE_BYTES no se enforza en el schema", () => {
  it("documenta que el schema acepta archivos por encima de MAX_FILE_SIZE_BYTES (golden test del comportamiento actual)", () => {
    const archivoEnorme = {
      ...validArchivo,
      tamanoBytes: MAX_FILE_SIZE_BYTES + 1,
    }
    const result = paso5Schema.safeParse({
      ...validPaso5,
      archivosDeclarados: [archivoEnorme],
    })
    expect(result.success).toBe(true)
  })

  it("expone constantes ACCEPTED_MIME_TYPES y MAX_FILE_SIZE_BYTES como valores estables", () => {
    expect(MAX_FILE_SIZE_BYTES).toBe(10 * 1024 * 1024)
    expect(ACCEPTED_MIME_TYPES).toEqual(["image/jpeg", "image/png", "application/pdf"])
  })
})
