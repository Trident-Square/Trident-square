'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-lg flex items-center justify-center text-fg/80 hover:text-fg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.span
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.span>
    </motion.button>
  )
}
