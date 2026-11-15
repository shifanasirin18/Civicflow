const schemas = {
  'Aadhaar Card': [
    { en: 'Name detected', ta: 'பெயர் கண்டறியப்பட்டது', hi: 'नाम का पता चला' },
    { en: 'Date of Birth detected', ta: 'பிறந்த தேதி கண்டறியப்பட்டது', hi: 'जन्म तिथि का पता चला' },
    { en: 'Aadhaar number detected', ta: 'ஆதார் எண் கண்டறியப்பட்டது', hi: 'आधार नंबर का पता चला' },
  ],
  'PAN Card': [
    { en: 'Name detected', ta: 'பெயர் கண்டறியப்பட்டது', hi: 'नाम का पता चला' },
    { en: 'PAN number detected', ta: 'PAN எண் கண்டறியப்பட்டது', hi: 'पैन नंबर का पता चला' },
    { en: 'Date of Birth detected', ta: 'பிறந்த தேதி கண்டறியப்பட்டது', hi: 'जन्म तिथि का पता चला' },
  ],
  'Income Certificate': [
    { en: 'Name detected', ta: 'பெயர் கண்டறியப்பட்டது', hi: 'नाम का पता चला' },
    { en: 'Annual income figure detected', ta: 'ஆண்டு வருமான தொகை கண்டறியப்பட்டது', hi: 'वार्षिक आय राशि का पता चला' },
    { en: 'Issuing authority detected', ta: 'வழங்கும் அதிகாரம் கண்டறியப்பட்டது', hi: 'जारी करने वाले प्राधिकरण का पता चला' },
  ],
}

/**
 * Placeholder field-presence check. A real version would look for the
 * fields above inside `ocrResult.rawText` (regex / NER), and mark
 * `low_quality` when `ocrResult.confidence` is below a threshold for a
 * field's expected region. This mock version randomizes outcomes so the
 * frontend has representative data to build against.
 */
export function checkFields(detectedType) {
  const fields = schemas[detectedType] ?? schemas['Aadhaar Card']
  return fields.map((label, i) => ({
    label,
    status: i === fields.length - 1 && Math.random() > 0.6 ? 'low_quality' : Math.random() > 0.25 ? 'found' : 'missing',
  }))
}

export function guessDocumentType(_rawText) {
  const types = Object.keys(schemas)
  return types[Math.floor(Math.random() * types.length)]
}

