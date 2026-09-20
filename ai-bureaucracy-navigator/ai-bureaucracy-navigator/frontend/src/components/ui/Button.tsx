import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 text-white shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/35 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-xs border border-white/20',
  secondary:
    'bg-brand-50 text-brand-600 hover:bg-brand-100 hover:text-brand-700 shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5 border border-brand-200/50',
  outline:
    'border border-line bg-surface/90 backdrop-blur-sm text-ink hover:bg-surface shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0.5',
  ghost:
    'text-ink-soft hover:bg-canvas hover:text-ink hover:-translate-y-0.5 active:translate-y-0',
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-xl',
  md: 'text-sm px-4 py-2.5 rounded-xl',
  lg: 'text-base px-6 py-3.5 rounded-2xl font-semibold',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
}

export function Button({ variant = 'primary', size = 'md', icon, className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      className={`focus-ring inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none disabled:shadow-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}

