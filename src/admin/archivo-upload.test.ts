import { describe, it, expect } from "vitest"
import {
  adminUploadUrlRequestSchema,
  adminUploadUrlResponseSchema,
} from "./archivo-upload.js"

describe("adminUploadUrlRequestSchema", () => {
  it("acepta un request válido", () => {
    expect(
      adminUploadUrlRequestSchema.safeParse({
        tipo_archivo: "ine_frente",
        nombre_original: "ine.jpg",
        mime_type: "image/jpeg",
        tamano_bytes: 524288,
      }).success,
    ).toBe(true)
  })

  it("rechaza tamano_bytes <= 0", () => {
    expect(
      adminUploadUrlRequestSchema.safeParse({
        tipo_archivo: "ine_frente",
        nombre_original: "ine.jpg",
        mime_type: "image/jpeg",
        tamano_bytes: 0,
      }).success,
    ).toBe(false)
  })

  it("rechaza tipo_archivo fuera del enum", () => {
    expect(
      adminUploadUrlRequestSchema.safeParse({
        tipo_archivo: "selfie",
        nombre_original: "ine.jpg",
        mime_type: "image/jpeg",
        tamano_bytes: 524288,
      }).success,
    ).toBe(false)
  })
})

describe("adminUploadUrlResponseSchema", () => {
  it("acepta un response válido", () => {
    expect(
      adminUploadUrlResponseSchema.safeParse({
        uploadUrl: "https://storage.example.com/upload/abc",
        storagePath: "uploads/abc.jpg",
        archivoId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        expiresIn: 3600,
      }).success,
    ).toBe(true)
  })

  it("rechaza un uploadUrl que no es URL", () => {
    expect(
      adminUploadUrlResponseSchema.safeParse({
        uploadUrl: "not-a-url",
        storagePath: "uploads/abc.jpg",
        archivoId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        expiresIn: 3600,
      }).success,
    ).toBe(false)
  })
})
