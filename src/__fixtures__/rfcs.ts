export const VALID_RFC_PERSONA_FISICA = "MARJ800101ABC"
export const VALID_RFC_PERSONA_MORAL = "ABC800101XYZ"
export const VALID_RFC_LOWERCASE = "marj800101abc"
export const VALID_RFC_WITH_SPACES = "  MARJ800101ABC  "

/** 11 chars: ni persona moral (12) ni persona física (13). */
export const INVALID_RFC_TOO_SHORT = "MARJ800101A"
/** 14 chars: ni persona moral (12) ni persona física (13). */
export const INVALID_RFC_TOO_LONG = "MARJ800101ABCDE"
export const INVALID_RFC_BAD_CHARS = "MARJ800101AB!"
export const INVALID_RFC_BAD_DATE = "MARJ801301ABC"
