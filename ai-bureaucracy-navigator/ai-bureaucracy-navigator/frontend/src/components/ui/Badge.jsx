const toneClasses = {
  good: 'bg-good-100 text-good-500',
  warn: 'bg-warn-100 text-warn-500',
  bad: 'bg-bad-100 text-bad-500',
  brand: 'bg-brand-50 text-brand-600',
  neutral: 'bg-canvas text-ink-soft',
}

export function Badge({ tone = 'neutral', className = '', children }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]} ${className}`}>
      {children}
    </span>
  )
}

