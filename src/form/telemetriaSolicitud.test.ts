import { describe, expect, it } from 'vitest'
import {
  TELEMETRIA_CAMPO_MAX_LENGTH,
  TELEMETRIA_FINGERPRINT_MAX_LENGTH,
  TELEMETRIA_LOCALE_MAX_LENGTH,
  TELEMETRIA_REFERRER_MAX_LENGTH,
  TELEMETRIA_TIMEZONE_MAX_LENGTH,
  TELEMETRIA_USER_AGENT_MAX_LENGTH,
} from '../constants.js'
import { telemetriaSolicitudSchema } from './telemetriaSolicitud.js'

const minimal = {
  iniciadoEn: '2026-05-12T14:00:00.000Z',
  enviadoEn: '2026-05-12T14:08:30.000Z',
  duracionTotalMs: 510_000,
  tiemposPaso: {
    paso1Ms: 90_000,
    paso2Ms: 60_000,
    paso3Ms: 75_000,
    paso4Ms: 80_000,
    paso5Ms: 60_000,
    paso6Ms: 90_000,
    paso7Ms: 55_000,
  },
  edicionesPorCampo: {
    nombre: 1,
    curp: 2,
    montoSolicitado: 3,
  },
  dispositivo: {
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1',
    viewport: { width: 390, height: 844 },
    idioma: 'es-MX',
    zonaHoraria: 'America/Mexico_City',
  },
}

describe('telemetriaSolicitudSchema', () => {
  it('acepta payload mínimo válido', () => {
    expect(telemetriaSolicitudSchema.safeParse(minimal).success).toBe(true)
  })

  it('acepta payload completo con red, fingerprint y geolocalización', () => {
    const completo = {
      ...minimal,
      red: { referrer: 'https://www.google.com/' },
      fingerprint: 'abcdef0123456789',
      geolocalizacion: {
        lat: 19.4326,
        lon: -99.1332,
        precisionMetros: 25.5,
        capturadaEn: '2026-05-12T14:00:05.000Z',
      },
    }
    expect(telemetriaSolicitudSchema.safeParse(completo).success).toBe(true)
  })

  it('acepta tiemposPaso con pasos null cuando no se midieron', () => {
    const conNull = {
      ...minimal,
      tiemposPaso: {
        ...minimal.tiemposPaso,
        paso5Ms: null,
        paso7Ms: null,
      },
    }
    expect(telemetriaSolicitudSchema.safeParse(conNull).success).toBe(true)
  })

  it('rechaza iniciadoEn que no sea ISO datetime', () => {
    const r = telemetriaSolicitudSchema.safeParse({ ...minimal, iniciadoEn: '12 de mayo 2026' })
    expect(r.success).toBe(false)
  })

  it('rechaza enviadoEn que no sea ISO datetime', () => {
    const r = telemetriaSolicitudSchema.safeParse({ ...minimal, enviadoEn: 'ayer en la tarde' })
    expect(r.success).toBe(false)
  })

  it('rechaza duracionTotalMs negativa', () => {
    const r = telemetriaSolicitudSchema.safeParse({ ...minimal, duracionTotalMs: -1 })
    expect(r.success).toBe(false)
  })

  it('rechaza duracionTotalMs no entera', () => {
    const r = telemetriaSolicitudSchema.safeParse({ ...minimal, duracionTotalMs: 510.5 })
    expect(r.success).toBe(false)
  })

  it('rechaza paso1Ms negativo', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      tiemposPaso: { ...minimal.tiemposPaso, paso1Ms: -1 },
    })
    expect(r.success).toBe(false)
  })

  it('rechaza edicionesPorCampo con valor negativo', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      edicionesPorCampo: { nombre: -1 },
    })
    expect(r.success).toBe(false)
  })

  it('rechaza edicionesPorCampo con valor no entero', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      edicionesPorCampo: { nombre: 1.5 },
    })
    expect(r.success).toBe(false)
  })

  it('rechaza edicionesPorCampo con key vacía', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      edicionesPorCampo: { '': 1 },
    })
    expect(r.success).toBe(false)
  })

  it(`rechaza edicionesPorCampo con key de más de ${TELEMETRIA_CAMPO_MAX_LENGTH} caracteres`, () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      edicionesPorCampo: { ['a'.repeat(TELEMETRIA_CAMPO_MAX_LENGTH + 1)]: 1 },
    })
    expect(r.success).toBe(false)
  })

  it('rechaza edicionesPorCampo con key con caracteres no permitidos', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      edicionesPorCampo: { 'campo con espacios': 1 },
    })
    expect(r.success).toBe(false)
  })

  it('rechaza edicionesPorCampo con más de 200 entradas', () => {
    const muchas: Record<string, number> = {}
    for (let i = 0; i < 201; i++) muchas[`campo${i}`] = 1
    const r = telemetriaSolicitudSchema.safeParse({ ...minimal, edicionesPorCampo: muchas })
    expect(r.success).toBe(false)
  })

  it(`rechaza userAgent con más de ${TELEMETRIA_USER_AGENT_MAX_LENGTH} caracteres`, () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      dispositivo: {
        ...minimal.dispositivo,
        userAgent: 'a'.repeat(TELEMETRIA_USER_AGENT_MAX_LENGTH + 1),
      },
    })
    expect(r.success).toBe(false)
  })

  it('rechaza viewport con dimensiones negativas', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      dispositivo: { ...minimal.dispositivo, viewport: { width: -1, height: 100 } },
    })
    expect(r.success).toBe(false)
  })

  it(`rechaza idioma con más de ${TELEMETRIA_LOCALE_MAX_LENGTH} caracteres`, () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      dispositivo: { ...minimal.dispositivo, idioma: 'a'.repeat(TELEMETRIA_LOCALE_MAX_LENGTH + 1) },
    })
    expect(r.success).toBe(false)
  })

  it(`rechaza zonaHoraria con más de ${TELEMETRIA_TIMEZONE_MAX_LENGTH} caracteres`, () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      dispositivo: {
        ...minimal.dispositivo,
        zonaHoraria: 'a'.repeat(TELEMETRIA_TIMEZONE_MAX_LENGTH + 1),
      },
    })
    expect(r.success).toBe(false)
  })

  it('acepta dispositivo.plataforma opcional', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      dispositivo: { ...minimal.dispositivo, plataforma: 'iPhone' },
    })
    expect(r.success).toBe(true)
  })

  it(`rechaza referrer con más de ${TELEMETRIA_REFERRER_MAX_LENGTH} caracteres`, () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      red: { referrer: 'a'.repeat(TELEMETRIA_REFERRER_MAX_LENGTH + 1) },
    })
    expect(r.success).toBe(false)
  })

  it(`rechaza fingerprint con más de ${TELEMETRIA_FINGERPRINT_MAX_LENGTH} caracteres`, () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      fingerprint: 'a'.repeat(TELEMETRIA_FINGERPRINT_MAX_LENGTH + 1),
    })
    expect(r.success).toBe(false)
  })

  it('rechaza fingerprint vacío', () => {
    const r = telemetriaSolicitudSchema.safeParse({ ...minimal, fingerprint: '' })
    expect(r.success).toBe(false)
  })

  it('rechaza geolocalización con lat fuera de rango [-90,90]', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      geolocalizacion: {
        lat: 91,
        lon: 0,
        capturadaEn: '2026-05-12T14:00:05.000Z',
      },
    })
    expect(r.success).toBe(false)
  })

  it('rechaza geolocalización con lon fuera de rango [-180,180]', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      geolocalizacion: {
        lat: 0,
        lon: -181,
        capturadaEn: '2026-05-12T14:00:05.000Z',
      },
    })
    expect(r.success).toBe(false)
  })

  it('rechaza geolocalización con precisionMetros negativa', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      geolocalizacion: {
        lat: 0,
        lon: 0,
        precisionMetros: -1,
        capturadaEn: '2026-05-12T14:00:05.000Z',
      },
    })
    expect(r.success).toBe(false)
  })

  it('rechaza geolocalización con capturadaEn no ISO', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      geolocalizacion: { lat: 0, lon: 0, capturadaEn: 'hoy' },
    })
    expect(r.success).toBe(false)
  })

  it('rechaza enviadoEn anterior a iniciadoEn', () => {
    const r = telemetriaSolicitudSchema.safeParse({
      ...minimal,
      iniciadoEn: '2026-05-12T14:08:00.000Z',
      enviadoEn: '2026-05-12T14:00:00.000Z',
    })
    expect(r.success).toBe(false)
  })

  it('rechaza si falta tiemposPaso', () => {
    const { tiemposPaso: _, ...sinTiempos } = minimal
    expect(telemetriaSolicitudSchema.safeParse(sinTiempos).success).toBe(false)
  })

  it('rechaza si falta dispositivo', () => {
    const { dispositivo: _, ...sinDispositivo } = minimal
    expect(telemetriaSolicitudSchema.safeParse(sinDispositivo).success).toBe(false)
  })
})
