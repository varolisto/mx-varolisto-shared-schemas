export const DEPENDIENTES_ECONOMICOS = ['ninguno', 'uno', 'dos', 'tres', 'cuatro_o_mas'] as const

export type DependientesEconomicos = (typeof DEPENDIENTES_ECONOMICOS)[number]
