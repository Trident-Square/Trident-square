'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Inertial smooth scrolling for the whole site. Off for reduced-motion users, touch devices
 * and low-power machines (where an extra animation loop makes scrolling feel heavy).
 * lerp 0.16 keeps the glide but follows a mouse wheel closely; lower values felt "slow" on Windows.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const nav = navigator as Navigator & { deviceMemory?: number }
    if ((nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) || (nav.deviceMemory && nav.deviceMemory <= 4)) return
    const lenis = new Lenis({ lerp: 0.16, wheelMultiplier: 1.1, anchors: { offset: -80 }, syncTouch: false })
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
  return null
}
