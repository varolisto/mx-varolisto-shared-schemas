export const SEXO = ['M', 'F', 'X'] as const
export type Sexo = (typeof SEXO)[number]
