'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function ThemeToggle() {
  const { theme, preference, toggleTheme, useSystemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === 'dark'
  const followsSystem = preference === 'system'

  if (!mounted) {
    return (
      <div
        className="h-9 w-9 shrink-0 rounded-lg border border-border bg-card shadow-sm"
        aria-hidden
      />
    )
  }

  return (
    <motion.button
      type="button"
      onClick={(e) => {
        if (e.shiftKey) {
          useSystemTheme()
        } else {
          toggleTheme()
        }
      }}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-fg shadow-sm transition-colors hover:bg-accent-soft/60 dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800"
      aria-label={
        followsSystem
          ? isDark
            ? 'Switch to light mode (currently following system: dark)'
            : 'Switch to dark mode (currently following system: light)'
          : isDark
            ? 'Switch to light mode'
            : 'Switch to dark mode'
      }
      title={
        followsSystem
          ? 'Toggle light or dark. Shift+click: keep following system appearance.'
          : 'Toggle light or dark. Shift+click: follow system appearance again.'
      }
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.04 }}
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -40 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.18 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="h-[1.15rem] w-[1.15rem] text-amber-300" aria-hidden />
        ) : (
          <Moon className="h-[1.15rem] w-[1.15rem] text-indigo-700" aria-hidden />
        )}
      </motion.span>
    </motion.button>
  )
}
