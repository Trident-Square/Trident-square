import Link from 'next/link'
import { Fragment } from 'react'

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g

/** Renders the small inline syntax used in blog copy: **bold**, [link](/path), `code`. */
export default function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
        if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) {
          const [, label, href] = link
          return href.startsWith('/') ? (
            <Link key={i} href={href}>{label}</Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
