import { describe, expect, it } from 'vitest'
import {
  validArchivoDomain,
  validDireccionDomain,
  validIngresoDomain,
  validReferenciaDomain,
  validScoringDomain,
  validSolicitanteDomain,
  validSolicitudDomain,
} from '../__fixtures__/domain.fixtures.js'
import { archivoDomainSchema } from './archivo.js'
import { direccionDomainSchema } from './direccion.js'
import { ingresoDomainSchema } from './ingreso.js'
import { referenciaDomainSchema } from './referencia.js'
import { scoringDomainSchema } from './scoring.js'
import { solicitanteDomainSchema } from './solicitante.js'
import { solicitudDomainSchema } from './solicitud.js'

describe('dominio — schemas del modelo persistido', () => {
  it('solicitanteDomainSchema: acepta datos válidos', () => {
    expect(solicitanteDomainSchema.safeParse(validSolicitanteDomain).success).toBe(true)
  })

  it('solicitanteDomainSchema: rechaza CURP de longitud incorrecta', () => {
    const r = solicitanteDomainSchema.safeParse({ ...validSolicitanteDomain, curp: 'CORTA' })
    expect(r.success).toBe(false)
  })

  it('solicitudDomainSchema: acepta datos válidos', () => {
    expect(solicitudDomainSchema.safeParse(validSolicitudDomain).success).toBe(true)
  })

  it('solicitudDomainSchema: rechaza monto fuera del rango', () => {
    const r = solicitudDomainSchema.safeParse({ ...validSolicitudDomain, montoSolicitado: 100 })
    expect(r.success).toBe(false)
  })

  it('direccionDomainSchema: acepta datos válidos', () => {
    expect(direccionDomainSchema.safeParse(validDireccionDomain).success).toBe(true)
  })

  it('ingresoDomainSchema: acepta datos válidos', () => {
    expect(ingresoDomainSchema.safeParse(validIngresoDomain).success).toBe(true)
  })

  it('referenciaDomainSchema: acepta datos válidos', () => {
    expect(referenciaDomainSchema.safeParse(validReferenciaDomain).success).toBe(true)
  })

  it('archivoDomainSchema: acepta datos válidos', () => {
    expect(archivoDomainSchema.safeParse(validArchivoDomain).success).toBe(true)
  })

  it('scoringDomainSchema: acepta datos válidos', () => {
    expect(scoringDomainSchema.safeParse(validScoringDomain).success).toBe(true)
  })

  it('scoringDomainSchema: rechaza puntaje fuera del rango permitido', () => {
    const r = scoringDomainSchema.safeParse({ ...validScoringDomain, v1Historial: 30 })
    expect(r.success).toBe(false)
  })
})
