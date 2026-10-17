/** Giant outlined words drifting past — the service list as a texture. */
export default function WordMarquee({ words }: { words: string[] }) {
  const row = [...words, ...words]
  return (
    <div aria-hidden className="overflow-hidden border-y border-ink py-6 sm:py-8">
      <div className="flex w-max animate-marquee-slow items-center gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`display text-[clamp(3.5rem,9vw,8rem)] ${i % 2 ? 'text-ink' : 'text-transparent'}`}
              style={i % 2 ? undefined : { WebkitTextStroke: '1.5px rgb(var(--ink))' }}
            >
              {w}
            </span>
            <span className="h-4 w-4 shrink-0 bg-cobalt sm:h-5 sm:w-5" />
          </span>
        ))}
      </div>
    </div>
  )
}
