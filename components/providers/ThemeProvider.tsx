'use client'

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

export const STORAGE_KEY = 'trident-theme'

export type Theme = 'light' | 'dark'
export type ThemePreference = 'system' | Theme

function readStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system'
  const s = localStorage.getItem(STORAGE_KEY)
  if (s === 'light' || s === 'dark') return s
  if (s === 'system') return 'system'
  return 'system'
}

function persistPreference(p: ThemePreference) {
  try {
    localStorage.setItem(STORAGE_KEY, p)
  } catch {
    /* private mode */
  }
}

const ThemeContext = createContext<{
  theme: Theme
  /** `system` = follow OS; `light` / `dark` = fixed */
  preference: ThemePreference
  toggleTheme: () => void
  /** Shift+click on the toggle calls this — follow OS again */
  useSystemTheme: () => void
} | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>('system')
  const [systemDark, setSystemDark] = useState(false)
  const systemDarkRef = useRef(false)

  const resolvedTheme: Theme =
    preference === 'system' ? (systemDark ? 'dark' : 'light') : preference

  useLayoutEffect(() => {
    systemDarkRef.current = systemDark
  }, [systemDark])

  useLayoutEffect(() => {
    const stored = readStoredPreference()
    setPreference(stored)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemDark(mq.matches)

    const onChange = () => {
      setSystemDark(mq.matches)
    }
    mq.addEventListener('change', onChange)

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return
      if (e.newValue === 'light' || e.newValue === 'dark' || e.newValue === 'system') {
        setPreference(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)

    return () => {
      mq.removeEventListener('change', onChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  const toggleTheme = useCallback(() => {
    setPreference((prev) => {
      const sd = systemDarkRef.current
      const resolved = prev === 'system' ? (sd ? 'dark' : 'light') : prev
      const next: Theme = resolved === 'dark' ? 'light' : 'dark'
      persistPreference(next)
      return next
    })
  }, [])

  const useSystemTheme = useCallback(() => {
    persistPreference('system')
    setPreference('system')
  }, [])

  return (
    <ThemeContext.Provider
      value={{ theme: resolvedTheme, preference, toggleTheme, useSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
