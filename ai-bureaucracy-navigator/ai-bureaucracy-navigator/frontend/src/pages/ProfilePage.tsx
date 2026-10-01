import { useState, useRef, type ChangeEvent, type DragEvent } from 'react'
import {
  BadgeCheck,
  LogOut,
  Trash2,
  ShieldCheck,
  UploadCloud,
  FileText,
  X,
  Eye,
  Download,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { useNotifications } from '@/context/NotificationContext'
import type { VerificationItem } from '@/types'

export function ProfilePage() {
  const { user, logout, updateVerification } = useAuth()
  const { lang, setLang } = useLanguage()
  const { addNotification } = useNotifications()

  // Modal states
  const [activeItem, setActiveItem] = useState<VerificationItem | null>(null)
  const [previewDoc, setPreviewDoc] = useState<VerificationItem | null>(null)

  // Upload form states
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [docNumber, setDocNumber] = useState('')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!user) return null

  const openUploadModal = (item: VerificationItem) => {
    setActiveItem(item)
    setSelectedFile(null)
    setDocNumber(item.docNumber || '')
    setUploadError(null)
  }

  const closeUploadModal = () => {
    setActiveItem(null)
    setSelectedFile(null)
    setDocNumber('')
    setUploadError(null)
    setIsSaving(false)
  }

  const validateAndSetFile = (file: File) => {
    setUploadError(null)
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    if (!isPdf) {
      setUploadError('Only PDF documents (.pdf) are allowed. Please select a PDF file.')
      setSelectedFile(null)
      return
    }
    // Limit to 15MB
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('File size exceeds the 15MB limit. Please choose a smaller PDF.')
      setSelectedFile(null)
      return
    }
    setSelectedFile(file)
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const handleSaveDocument = async () => {
    if (!activeItem) return
    if (!selectedFile) {
      setUploadError('Please select a PDF document to upload.')
      return
    }

    setIsSaving(true)
    setUploadError(null)

    try {
      // Read file as Data URL (base64) so it can be previewed, saved, and downloaded
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        const formattedSize = formatFileSize(selectedFile.size)
        const dateStr = new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })

        updateVerification(activeItem.label, true, {
          docName: selectedFile.name,
          docData: dataUrl,
          docSize: formattedSize,
          uploadedAt: dateStr,
          docNumber: docNumber.trim() || undefined,
        })

        addNotification({
          title: `${activeItem.label} Document Uploaded`,
          message: `Your document "${selectedFile.name}" has been verified and saved to your profile.`,
          category: 'document',
          priority: 'medium',
        })

        setIsSaving(false)
        closeUploadModal()
      }

      reader.onerror = () => {
        setUploadError('Failed to read the PDF file. Please try again.')
        setIsSaving(false)
      }

      reader.readAsDataURL(selectedFile)
    } catch {
      setUploadError('An error occurred while saving the document.')
      setIsSaving(false)
    }
  }

  const handleRemoveVerification = (item: VerificationItem) => {
    if (window.confirm(`Are you sure you want to remove the document for ${item.label}?`)) {
      updateVerification(item.label, false)
      addNotification({
        title: `${item.label} Removed`,
        message: `The verification document for ${item.label} was removed.`,
        category: 'document',
        priority: 'low',
      })
    }
  }

  const handleDownload = (item: VerificationItem) => {
    if (!item.docData) return
    const a = document.createElement('a')
    a.href = item.docData
    a.download = item.docName || `${item.label.toLowerCase().replace(/\s+/g, '_')}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">Profile & Settings</h1>
        <p className="text-sm text-ink-soft">Manage your identity, uploaded PDF documents, and language preferences.</p>
      </div>

      <Card>
        <CardHeader title="Profile" />
        <div className="mb-4 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-600">
            {user.name.slice(0, 1).toUpperCase()}
          </span>
          <div>
            <p className="font-medium text-ink">{user.name}</p>
            <p className="text-sm text-ink-soft">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-1.5 text-xs text-ink-soft">
          <span>Profile completion</span>
          <span className="font-semibold text-brand-600">{user.profileCompletion}%</span>
        </div>
        <ProgressBar value={user.profileCompletion} />
      </Card>

      <Card>
        <CardHeader
          title="Verifications"
          action={
            <span className="text-xs text-ink-soft font-normal">
              {user.verifications.filter((v) => v.verified).length} of {user.verifications.length} verified
            </span>
          }
        />
        <div className="divide-y divide-line/60">
          {user.verifications.map((v) => (
            <div key={v.label} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {v.verified ? (
                    <BadgeCheck size={20} className="text-good-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-line/80 flex items-center justify-center" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${v.verified ? 'text-ink' : 'text-ink-soft'}`}>
                      {v.label}
                    </span>
                    {v.verified && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-good-50 text-good-700 border border-good-200">
                        Verified
                      </span>
                    )}
                  </div>

                  {v.verified && (
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
                      {v.docName ? (
                        <span className="flex items-center gap-1 font-mono text-brand-700 bg-brand-50/80 px-2 py-0.5 rounded border border-brand-100">
                          <FileText size={12} className="text-brand-500 shrink-0" />
                          <span className="truncate max-w-[190px] sm:max-w-[260px]">{v.docName}</span>
                        </span>
                      ) : (
                        <span className="text-ink-subtle">Digital Verification Recorded</span>
                      )}
                      {v.docSize && <span>{v.docSize}</span>}
                      {v.uploadedAt && <span>Saved on {v.uploadedAt}</span>}
                      {v.docNumber && (
                        <span className="text-ink-soft">
                          Ref: <span className="font-medium text-ink">{v.docNumber}</span>
                        </span>
                      )}
                    </div>
                  )}

                  {!v.verified && (
                    <p className="mt-0.5 text-xs text-ink-subtle">
                      Upload your official document in PDF format to verify.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {v.verified ? (
                  <>
                    {v.docData && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          icon={<Eye size={13} />}
                          onClick={() => setPreviewDoc(v)}
                        >
                          View PDF
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Download size={13} />}
                          title="Download PDF"
                          onClick={() => handleDownload(v)}
                        >
                          Download
                        </Button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => openUploadModal(v)}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700 px-2 py-1 rounded hover:bg-brand-50 transition-colors"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveVerification(v)}
                      className="text-xs text-ink-soft hover:text-bad-600 p-1.5 rounded hover:bg-bad-50 transition-colors"
                      title="Remove verification document"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={<UploadCloud size={14} />}
                    onClick={() => openUploadModal(v)}
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Language" />
        <div className="flex gap-2">
          {(['en', 'ta'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`focus-ring rounded-xl px-4 py-2 text-sm font-medium ${
                lang === l ? 'bg-brand-500 text-white' : 'border border-line text-ink-soft hover:bg-canvas'
              }`}
            >
              {l === 'en' ? 'English' : 'தமிழ்'}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Privacy" />
        <p className="mb-3 flex items-start gap-2 text-sm text-ink-soft">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-teal-600" />
          Uploaded PDF documents are encrypted and safely stored in your local session. They are strictly used for your
          roadmap verification and application assistance, and never shared with unauthorized parties.
        </p>
        <Button variant="outline" icon={<Trash2 size={14} />}>
          Request data deletion
        </Button>
      </Card>

      <Button variant="ghost" icon={<LogOut size={14} />} onClick={logout}>
        Log out
      </Button>

      {/* Upload Document Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-surface p-6 shadow-2xl border border-line animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 border border-brand-100">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">Upload Document</h3>
                  <p className="text-xs text-ink-soft">
                    Verify <span className="font-semibold text-brand-600">{activeItem.label}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeUploadModal}
                className="rounded-lg p-1.5 text-ink-soft hover:bg-canvas hover:text-ink transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-4">
              {/* File Dropzone */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Select PDF Document <span className="text-bad-500">*</span>
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`group relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                    isDragging
                      ? 'border-brand-500 bg-brand-50/50 scale-[0.99]'
                      : selectedFile
                        ? 'border-good-400 bg-good-50/30'
                        : 'border-line hover:border-brand-400 hover:bg-canvas/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />

                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-good-100 text-good-700">
                        <CheckCircle2 size={24} />
                      </div>
                      <p className="font-semibold text-ink text-sm break-all">{selectedFile.name}</p>
                      <p className="text-xs text-ink-soft mt-0.5">
                        {formatFileSize(selectedFile.size)} • PDF Ready to Save
                      </p>
                      <span className="mt-3 text-xs font-medium text-brand-600 group-hover:underline">
                        Click or drag another file to replace
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:scale-105 transition-transform">
                        <UploadCloud size={24} />
                      </div>
                      <p className="text-sm font-semibold text-ink">Click to upload or drag & drop</p>
                      <p className="text-xs text-ink-soft mt-1">Accepts PDF documents up to 15MB</p>
                      <span className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-canvas text-ink-soft border border-line">
                        Format: .PDF only
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Optional Document Number */}
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Document / Registration Number <span className="text-ink-subtle font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1234-5678-9012 or DOC-7890"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full rounded-xl border border-line px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              {/* Error Alert */}
              {uploadError && (
                <div className="flex items-center gap-2 rounded-xl bg-bad-50 p-3 text-xs text-bad-700 border border-bad-200">
                  <AlertCircle size={16} className="shrink-0 text-bad-500" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-line">
              <Button type="button" variant="ghost" onClick={closeUploadModal} disabled={isSaving}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                icon={isSaving ? <RefreshCw size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                onClick={handleSaveDocument}
                disabled={!selectedFile || isSaving}
              >
                {isSaving ? 'Saving…' : 'Save Document'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {previewDoc && previewDoc.docData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative flex flex-col w-full max-w-4xl h-[90vh] rounded-2xl bg-surface shadow-2xl border border-line overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-ink">{previewDoc.label}</h3>
                  <p className="text-xs text-ink-soft">
                    {previewDoc.docName} {previewDoc.docSize ? `(${previewDoc.docSize})` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  icon={<Download size={13} />}
                  onClick={() => handleDownload(previewDoc)}
                >
                  Download
                </Button>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="rounded-lg p-2 text-ink-soft hover:bg-canvas hover:text-ink transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Content - Embedded PDF */}
            <div className="flex-1 bg-ink/5 p-4 overflow-hidden">
              <iframe
                src={previewDoc.docData}
                title={previewDoc.docName || 'PDF Preview'}
                className="w-full h-full rounded-xl border border-line bg-white shadow-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

