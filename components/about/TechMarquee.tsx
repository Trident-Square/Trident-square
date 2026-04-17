'use client'

import { Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons'

export type TechMarqueeItem = {
  name: string
  iconSrc?: string
  Icon?: LucideIcon
}

export const techMarqueeItems: TechMarqueeItem[] = [
  { name: 'Next.js', iconSrc: `${DEVICON}/nextjs/nextjs-original.svg` },
  { name: 'React', iconSrc: `${DEVICON}/react/react-original.svg` },
  { name: 'Node.js', iconSrc: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: 'Python', iconSrc: `${DEVICON}/python/python-original.svg` },
  { name: 'Flutter', iconSrc: `${DEVICON}/flutter/flutter-original.svg` },
  { name: 'React Native', iconSrc: `${DEVICON}/react/react-original.svg` },
  { name: 'PostgreSQL', iconSrc: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: 'AWS', iconSrc: `${DEVICON}/amazonwebservices/amazonwebservices-original.svg` },
  { name: 'Docker', iconSrc: `${DEVICON}/docker/docker-original.svg` },
  { name: 'Firebase', iconSrc: `${DEVICON}/firebase/firebase-plain.svg` },
  { name: 'AI APIs', Icon: Sparkles },
]

function TechRow({ setId }: { setId: 'a' | 'b' }) {
  return (
    <>
      {techMarqueeItems.map((item, i) => {
        const LucideGlyph = item.Icon
        return (
          <div
            key={`${setId}-${i}-${item.name}`}
            className="mx-4 flex w-[8.25rem] shrink-0 flex-col items-center gap-3.5 sm:mx-6 sm:w-[9.5rem] lg:w-[10rem]"
          >
            <div
              className="group relative flex aspect-[5/4] w-full max-w-[10.25rem] items-center justify-center overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white via-white to-indigo-50/95 p-6 shadow-[0_22px_56px_-28px_rgba(67,56,202,0.45)] ring-1 ring-indigo-500/[0.12] transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:-translate-y-1 hover:shadow-[0_28px_64px_-24px_rgba(67,56,202,0.5)] dark:border-slate-600/70 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/60 dark:shadow-[0_28px_70px_-28px_rgba(0,0,0,0.75)] dark:ring-indigo-400/15 dark:hover:shadow-[0_32px_80px_-26px_rgba(0,0,0,0.85)] sm:aspect-square sm:max-w-[11rem] sm:p-7"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_0%,rgba(99,102,241,0.12),transparent_55%)] opacity-70 dark:bg-[radial-gradient(ellipse_90%_80%_at_50%_0%,rgba(129,140,248,0.18),transparent_58%)]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-teal-500/0 opacity-0 transition-opacity duration-300 group-hover:from-indigo-500/[0.06] group-hover:to-teal-500/[0.05] group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative z-[1] flex h-full w-full items-center justify-center">
                {item.iconSrc ? (
                  <img
                    src={item.iconSrc}
                    alt=""
                    width={88}
                    height={88}
                    className="h-[3.25rem] w-[3.25rem] max-h-full max-w-[85%] object-contain drop-shadow-[0_2px_8px_rgba(15,23,42,0.08)] transition-transform duration-300 group-hover:scale-[1.06] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:h-[3.75rem] sm:w-[3.75rem] lg:h-16 lg:w-16"
                    loading="lazy"
                    decoding="async"
                  />
                ) : LucideGlyph ? (
                  <LucideGlyph
                    className="h-[3.25rem] w-[3.25rem] text-indigo-600 transition-transform duration-300 group-hover:scale-[1.06] dark:text-indigo-300 sm:h-[3.75rem] sm:w-[3.75rem] lg:h-16 lg:w-16"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                ) : null}
              </div>
            </div>
            <span className="max-w-[10rem] text-center text-[10px] font-bold uppercase leading-tight tracking-[0.18em] text-indigo-950/75 dark:text-indigo-200/85 sm:text-[11px]">
              {item.name}
            </span>
          </div>
        )
      })}
    </>
  )
}

export default function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg via-bg/95 to-transparent sm:w-24 lg:w-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg via-bg/95 to-transparent sm:w-24 lg:w-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent dark:via-indigo-500/25"
        aria-hidden
      />
      <div className="relative z-[1] flex w-max py-6 motion-reduce:animate-none animate-tech-marquee sm:py-8">
        <div className="flex shrink-0 items-stretch">
          <TechRow setId="a" />
        </div>
        <div className="flex shrink-0 items-stretch" aria-hidden>
          <TechRow setId="b" />
        </div>
      </div>
    </div>
  )
}
