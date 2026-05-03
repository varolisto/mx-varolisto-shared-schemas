import { describe, it, expect } from "vitest"
import { scoringDomainSchema } from "./scoring.js"
import { validScoringDomain } from "../__fixtures__/domain.fixtures.js"

describe("scoringDomainSchema", () => {
  it("acepta un scoring válido", () => {
    expect(scoringDomainSchema.safeParse(validScoringDomain).success).toBe(true)
  })

  it("rechaza v1Historial > 25", () => {
    expect(
      scoringDomainSchema.safeParse({ ...validScoringDomain, v1Historial: 26 })
        .success,
    ).toBe(false)
  })

  it("rechaza total > 100", () => {
    expect(
      scoringDomainSchema.safeParse({ ...validScoringDomain, total: 101 })
        .success,
    ).toBe(false)
  })
})
