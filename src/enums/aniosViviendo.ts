export const ANIOS_VIVIENDO = ['menos_de_1', 'entre_1_y_2', 'entre_3_y_5', 'mas_de_5'] as const

export type AniosViviendo = (typeof ANIOS_VIVIENDO)[number]
