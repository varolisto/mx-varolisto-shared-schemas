export const ANTIGUEDAD = ["menos_1", "uno_a_dos", "mas_2"] as const
export type Antiguedad = typeof ANTIGUEDAD[number]
