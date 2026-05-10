import { describe, expect, it } from 'vitest'
import { getPlazoMaximo, getPlazosDisponibles } from './getPlazosDisponibles.js'

describe('getPlazosDisponibles', () => {
  it('$2,000 → solo 2-3 meses', () => {
    expect(getPlazosDisponibles(2000)).toEqual(['2', '3'])
  })

  it('$3,499 → solo 2-3 meses (límite superior del primer tramo)', () => {
    expect(getPlazosDisponibles(3499)).toEqual(['2', '3'])
  })

  it('$3,500 → 2-4 meses (inicio segundo tramo)', () => {
    expect(getPlazosDisponibles(3500)).toEqual(['2', '3', '4'])
  })

  it('$7,000 → 2-4 meses (límite superior del segundo tramo)', () => {
    expect(getPlazosDisponibles(7000)).toEqual(['2', '3', '4'])
  })

  it('$7,001 → 2-5 meses', () => {
    expect(getPlazosDisponibles(7001)).toEqual(['2', '3', '4', '5'])
  })

  it('$12,000 → 2-5 meses', () => {
    expect(getPlazosDisponibles(12000)).toEqual(['2', '3', '4', '5'])
  })

  it('$12,001 → 2-6 meses', () => {
    expect(getPlazosDisponibles(12001)).toEqual(['2', '3', '4', '5', '6'])
  })

  it('$20,000 → 2-6 meses (máximo)', () => {
    expect(getPlazosDisponibles(20000)).toEqual(['2', '3', '4', '5', '6'])
  })
})

describe('getPlazoMaximo', () => {
  it('$3,000 → máximo es 3', () => {
    expect(getPlazoMaximo(3000)).toBe('3')
  })

  it('$20,000 → máximo es 6', () => {
    expect(getPlazoMaximo(20000)).toBe('6')
  })
})
