export const PROVEEDOR_VALIDACION_OCR = ['aws_textract', 'tesseract', 'google_document_ai'] as const

export type ProveedorValidacionOcr = (typeof PROVEEDOR_VALIDACION_OCR)[number]
