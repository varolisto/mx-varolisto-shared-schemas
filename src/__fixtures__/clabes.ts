/**
 * CLABEs de prueba. VALID_CLABE_STP es un test fixture canónico documentado en
 * la dev-net de STP. VALID_CLABE_BBVA fue construida con el algoritmo Banxico.
 */

export const VALID_CLABE_STP = '646180157000000004'
export const VALID_CLABE_BBVA = '012180001234567899'

export const INVALID_CLABE_BAD_CONTROL = '646180157000000000'
export const INVALID_CLABE_TOO_SHORT = '64618015700000000'
export const INVALID_CLABE_TOO_LONG = '6461801570000000048'
export const INVALID_CLABE_NON_NUMERIC = '64618015700000000A'
export const INVALID_CLABE_EMPTY = ''
