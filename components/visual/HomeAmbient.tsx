'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Full-homepage ambient orbs — transform-only, inset-0 parent, scroll-safe.
 */
export default function HomeAmbient() {
  const reduce = useReducedMotion()
  const blur = 'blur-[88px] sm:blur-[110px]'

  if (reduce) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div
          className={`absolute -top-[12%] -right-[18%] rounded-full ${blur} h-[min(70vw,420px)] w-[min(70vw,420px)] bg-indigo-500/[0.42] dark:bg-indigo-400/[0.16]`}
        />
        <div
          className={`absolute -bottom-[14%] -left-[22%] rounded-full ${blur} h-[min(65vw,380px)] w-[min(65vw,380px)] bg-teal-400/[0.38] dark:bg-teal-400/[0.13]`}
        />
        <div
          className={`absolute left-[8%] top-[36%] rounded-full ${blur} h-[min(55vw,320px)] w-[min(55vw,320px)] bg-blue-500/[0.3] dark:bg-blue-400/[0.1]`}
        />
      </div>
    )
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className={`absolute -top-[12%] -right-[18%] rounded-full ${blur} h-[min(70vw,480px)] w-[min(70vw,480px)] bg-indigo-500/[0.58] dark:bg-indigo-400/[0.26]`}
        initial={false}
        animate={{
          x: [0, 36, 8, -20, 0],
          y: [0, 22, 44, 14, 0],
          scale: [1, 1.08, 1.03, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={`absolute -bottom-[14%] -left-[22%] rounded-full ${blur} h-[min(65vw,440px)] w-[min(65vw,440px)] bg-teal-400/[0.5] dark:bg-teal-400/[0.2]`}
        initial={false}
        animate={{
          x: [0, -28, -6, 24, 0],
          y: [0, -18, -36, -10, 0],
          scale: [1, 1.06, 0.98, 1.04, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2,
        }}
      />
      <motion.div
        className={`absolute left-[6%] top-[34%] rounded-full ${blur} h-[min(58vw,360px)] w-[min(58vw,360px)] bg-blue-500/[0.44] dark:bg-blue-400/[0.17]`}
        initial={false}
        animate={{
          scale: [0.92, 1.12, 0.96, 1.08, 0.92],
          opacity: [0.75, 1, 0.8, 0.95, 0.75],
          x: [0, 18, -12, 8, 0],
          y: [0, 14, 24, 6, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.35,
        }}
      />
      <motion.div
        className={`absolute right-[12%] top-[48%] rounded-full ${blur} h-[min(45vw,280px)] w-[min(45vw,280px)] bg-violet-500/[0.4] dark:bg-violet-400/[0.14]`}
        initial={false}
        animate={{
          x: [0, -16, 12, -8, 0],
          y: [0, 28, 8, 20, 0],
          opacity: [0.65, 0.95, 0.7, 0.9, 0.65],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  )
}
