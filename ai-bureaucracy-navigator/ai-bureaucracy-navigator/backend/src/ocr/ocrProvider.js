/**
 * MOCK implementation for local development without an OCR dependency
 * installed yet. Swap this for tesseract.js or a cloud OCR SDK call —
 * see ./README.md. The route layer (documents.routes.js) only depends on
 * this function's signature, not on how it's implemented.
 */
export async function runOcr(_buffer, _mimeType) {
  return {
    rawText: '[mock OCR output — replace runOcr() in src/ocr/ocrProvider.js with a real provider]',
    confidence: 0.5,
  }
}

