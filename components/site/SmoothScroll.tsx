'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/** Inertial smooth scrolling for the whole site. Off for reduced-motion users and touch devices. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -80 }, syncTouch: false })
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
