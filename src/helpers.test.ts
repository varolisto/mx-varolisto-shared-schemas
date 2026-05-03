import { describe, it, expect } from "vitest"
import { zStr } from "./helpers.js"

describe("zStr", () => {
  it("acepta un string no vacío", () => {
    const schema = zStr()
    expect(schema.parse("hola")).toBe("hola")
  })

  it("trimea espacios alrededor", () => {
    const schema = zStr()
    expect(schema.parse("  hola  ")).toBe("hola")
  })

  it("rechaza string vacío con mensaje default", () => {
    const schema = zStr()
    const result = schema.safeParse("")
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Campo requerido")
    }
  })

  it("rechaza string de solo espacios con mensaje custom", () => {
    const schema = zStr("Selecciona una opción")
    const result = schema.safeParse("   ")
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Selecciona una opción")
    }
  })

  it("usa el mensaje custom cuando el valor no es string", () => {
    const schema = zStr("Selecciona una opción")
    const result = schema.safeParse(undefined)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Selecciona una opción")
    }
  })
})
