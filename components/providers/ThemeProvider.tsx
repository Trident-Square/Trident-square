'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'trident-theme'

// Only 'dark' theme for now
type Theme = 'dark'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
} | null>(null)

function applyTheme(theme: Theme) {
  // Always add the dark class
  document.documentElement.classList.add('dark')
  localStorage.setItem(STORAGE_KEY, theme)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')

  useEffect(() => {
    applyTheme('dark')
  }, [])

  const setTheme = (t: Theme) => setThemeState(t)
  const toggleTheme = () => setThemeState('dark') // for now, toggle does nothing

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}