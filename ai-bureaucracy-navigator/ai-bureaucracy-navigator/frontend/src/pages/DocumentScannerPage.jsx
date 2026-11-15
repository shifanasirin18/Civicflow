import { useRef, useState } from 'react'
import { UploadCloud, CheckCircle2, AlertTriangle, XCircle, RefreshCcw, Trash2 } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'
import { useAppData } from '@/context/AppDataContext'

const DOC_TYPE_GUESSES = ['Aadhaar Card', 'PAN Card', 'Income Certificate', 'Passport', 'Driving Licence']

/**
 * Mock OCR/field-check. The real implementation runs OCR (e.g. Tesseract or
 * a cloud OCR API) server-side, then checks extracted fields against the
 * expected schema for the detected document type. See backend/src/ocr/README.md.
 */
function mockScan(_fileName) {
  const detectedType = DOC_TYPE_GUESSES[Math.floor(Math.random() * DOC_TYPE_GUESSES.length)]
  const possibleFields = [
    { label: { en: 'Name detected', ta: 'பெயர் கண்டறியப்பட்டது' }, status: 'found' },
    { label: { en: 'Date of Birth detected', ta: 'பிறந்த தேதி கண்டறியப்பட்டது' }, status: 'found' },
    { label: { en: 'Document number detected', ta: 'ஆவண எண் கண்டறியப்பட்டது' }, status: Math.random() > 0.3 ? 'found' : 'missing' },
    { label: { en: 'Address detected', ta: 'முகவரி கண்டறியப்பட்டது' }, status: Math.random() > 0.5 ? 'found' : 'missing' },
    { label: { en: 'Image quality', ta: 'படத் தரம்' }, status: Math.random() > 0.6 ? 'found' : 'low_quality' },
  ]
  const overallQuality = possibleFields.some((f) => f.status !== 'found') ? 'needs_rescan' : 'good'
  return { detectedType, fieldChecks: possibleFields, overallQuality }
}

function StatusIcon({ status }) {
  if (status === 'found') return <CheckCircle2 size={16} className="text-good-500" />
  if (status === 'low_quality') return <AlertTriangle size={16} className="text-warn-500" />
  return <XCircle size={16} className="text-bad-500" />
}

export function DocumentScannerPage() {
  const { t } = useLanguage()
  const { documents, addDocument, removeDocument } = useAppData()
  const inputRef = useRef(null)
  const [scanning, setScanning] = useState(false)

  const handleFiles = (files) => {
    if (!files || files.length === 0) return
    setScanning(true)
    const file = files[0]
    setTimeout(() => {
      const result = mockScan(file.name)
      addDocument({
        id: crypto.randomUUID(),
        fileName: file.name,
        uploadedAt: new Date().toLocaleString(),
        ...result,
      })
      setScanning(false)
    }, 900)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">{t('document_quality_check')}</h1>
        <p className="text-sm text-ink-soft">
          We check that expected fields are present and legible. This does not verify legal authenticity.
        </p>
      </div>

      <Card
        className="cursor-pointer border-2 border-dashed border-line bg-canvas/40 text-center"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          handleFiles(e.dataTransfer.files)
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <UploadCloud size={28} className="mx-auto mb-2 text-brand-500" />
        <p className="text-sm font-medium text-ink">{t('upload_document')}</p>
        <p className="text-xs text-ink-soft">PDF, JPG or PNG · drag & drop or click to browse</p>
        {scanning && <p className="mt-3 text-xs font-medium text-brand-600">Scanning…</p>}
      </Card>

      <div className="space-y-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader
              title={
                <span>
                  {doc.detectedType} <span className="text-xs font-normal text-ink-soft">({doc.fileName})</span>
                </span>
              }
              action={
                <Badge tone={doc.overallQuality === 'good' ? 'good' : 'warn'}>
                  {doc.overallQuality === 'good' ? 'Verified fields' : 'Needs attention'}
                </Badge>
              }
            />
            <ul className="mb-4 space-y-2 text-sm">
              {doc.fieldChecks.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-ink">
                  <StatusIcon status={f.status} /> {f.label.en}
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                icon={<RefreshCcw size={13} />}
                onClick={() => handleFiles([new File([], doc.fileName)])}
              >
                {t('rescan_document')}
              </Button>
              <Button size="sm" variant="ghost" icon={<Trash2 size={13} />} onClick={() => removeDocument(doc.id)}>
                Remove
              </Button>
            </div>
          </Card>
        ))}
        {documents.length === 0 && !scanning && (
          <p className="text-center text-sm text-ink-soft">No documents scanned yet.</p>
        )}
      </div>
    </div>
  )
}
