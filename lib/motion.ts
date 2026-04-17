import type { Transition, Variants } from 'framer-motion'

/** Smooth deceleration — feels premium without being bouncy */
export const easePremium: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function transition(
  prefersReducedMotion: boolean | null,
  duration = 0.5,
  extra?: Partial<Transition>
): Transition {
  if (prefersReducedMotion) return { duration: 0 }
  return { duration, ease: easePremium, ...extra }
}

export function staggerDelay(
  prefersReducedMotion: boolean | null,
  base = 0.07,
  initial = 0.1
): { staggerChildren: number; delayChildren: number } {
  return prefersReducedMotion
    ? { staggerChildren: 0, delayChildren: 0 }
    : { staggerChildren: base, delayChildren: initial }
}

export function fadeUpVariants(
  prefersReducedMotion: boolean | null,
  y = 20
): Variants {
  if (prefersReducedMotion) {
    return { hidden: { opacity: 1 }, show: { opacity: 1 } }
  }
  return {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.52, ease: easePremium },
    },
  }
}

export function fadeInVariants(prefersReducedMotion: boolean | null): Variants {
  if (prefersReducedMotion) {
    return { hidden: { opacity: 1 }, show: { opacity: 1 } }
  }
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.45, ease: easePremium } },
  }
}
