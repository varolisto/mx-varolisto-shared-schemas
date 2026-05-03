import { describe, it, expect } from "vitest"
import { archivoDomainSchema } from "./archivo.js"
import { validArchivoDomain } from "../__fixtures__/domain.fixtures.js"

describe("archivoDomainSchema", () => {
  it("acepta un archivo válido", () => {
    expect(archivoDomainSchema.safeParse(validArchivoDomain).success).toBe(true)
  })

  it("rechaza tamanoBytes <= 0", () => {
    expect(
      archivoDomainSchema.safeParse({ ...validArchivoDomain, tamanoBytes: 0 })
        .success,
    ).toBe(false)
  })
})
