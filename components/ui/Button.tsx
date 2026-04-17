import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  href?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  fullWidth?: boolean
  disabled?: boolean
}

export default function Button({
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:focus-visible:ring-indigo-400/60 dark:focus-visible:ring-offset-slate-900'

  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-white/25 hover:from-indigo-500 hover:via-indigo-600 hover:to-blue-500 hover:shadow-xl hover:shadow-indigo-500/35 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:active:scale-100 dark:from-indigo-500 dark:via-indigo-500 dark:to-blue-500 dark:shadow-indigo-950/55 dark:ring-white/15 dark:hover:from-indigo-400 dark:hover:to-blue-400',
    secondary:
      'bg-card text-indigo-950 border border-border hover:border-indigo-300 hover:bg-indigo-50/80 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:text-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-800',
    outline:
      'border border-border text-fg bg-card hover:bg-indigo-50/60 hover:border-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:border-slate-500',
    ghost:
      'text-fg hover:bg-indigo-50/80 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-slate-800/80',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-7 py-3.5 text-base',
  }

  const classes = cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
