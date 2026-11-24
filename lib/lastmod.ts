/**
 * Automatic "last modified" dates for the sitemap.
 *
 * Every page gets a fingerprint (hash) of the source that renders it: the page file
 * and the components it imports, plus — for services, case studies and blog posts —
 * that one entry in lib/services.ts, lib/work.ts or lib/blog.ts. lib/lastmod.json keeps
 * the last fingerprint and the day it changed. When a fingerprint no longer matches,
 * the page counts as changed and gets a new date — nobody has to remember to update it.
 *
 * Used at build time by app/sitemap.ts and by scripts/update-lastmod.mts (`npm run lastmod`),
 * so it imports only Node built-ins and relative paths.
 */
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export type Stamp = { hash: string; date: string }
export type Stamps = Record<string, Stamp>

export const STAMPS_FILE = 'lib/lastmod.json'

const read = (root: string, rel: string) => {
  const p = join(root, rel)
  return existsSync(p) ? readFileSync(p, 'utf8') : ''
}

/** Direct imports from components/ and lib/ — the parts that change what a page shows. */
function localImports(source: string) {
  const out: string[] = []
  for (const m of source.matchAll(/from '@\/((?:components|lib)\/[^']+)'/g)) {
    const base = m[1]
    // Shared plumbing would make every page look "changed" on unrelated edits. Data files are
    // left out too: detail pages count only their own entry, list pages get their data below.
    if (/^lib\/(seo|utils|lastmod|services|work|blog|site)$/.test(base) || /\/(JsonLd|Arrow|Reveal)$/.test(base)) continue
    out.push(base)
  }
  return out
}

/** A page file plus the components and lib files it imports: their text and their paths. */
function fileWithImports(root: string, rel: string) {
  const src = read(root, rel)
  const parts = [src]
  const files = [rel]
  for (const base of localImports(src)) {
    for (const ext of ['.tsx', '.ts']) {
      const dep = read(root, base + ext)
      if (dep) {
        parts.push(dep)
        files.push(base + ext)
        break
      }
    }
  }
  return { text: parts.join('\n'), files }
}

/** Splits a data file into its entries, keyed by slug. */
function entries(root: string, rel: string) {
  const src = read(root, rel)
  const map = new Map<string, string>()
  const starts = [...src.matchAll(/\n {2}\{\n {4}slug: '([^']+)'/g)]
  starts.forEach((m, i) => {
    const end = i + 1 < starts.length ? starts[i + 1].index : src.length
    map.set(m[1], src.slice(m.index, end))
  })
  return map
}

const hash = (s: string) => createHash('sha1').update(s).digest('hex').slice(0, 12)

type Source = { hash: string; files: string[] }

/** Fingerprint and source files of every page in the sitemap, keyed by path. */
function sources(root: string): Record<string, Source> {
  const out: Record<string, Source> = {}
  const page = (path: string, file: string, ...extra: string[]) => {
    const f = fileWithImports(root, file)
    out[path] = { hash: hash([f.text, ...extra.map((e) => read(root, e))].join('\n')), files: [...f.files, ...extra] }
  }

  page('/', 'app/page.tsx')
  page('/services', 'app/services/page.tsx', 'lib/services.ts')
  page('/partners', 'app/partners/page.tsx', 'public/partner-deck.html', 'lib/site.ts')
  page('/work', 'app/work/page.tsx', 'lib/work.ts')
  page('/blog', 'app/blog/page.tsx', 'lib/blog.ts')
  page('/about', 'app/about/page.tsx')
  page('/contact', 'app/contact/page.tsx')
  page('/privacy', 'app/privacy/page.tsx')

  const dynamic: [string, string, string][] = [
    ['/services/', 'lib/services.ts', 'app/services/[slug]/page.tsx'],
    ['/work/', 'lib/work.ts', 'app/work/[slug]/page.tsx'],
    ['/blog/', 'lib/blog.ts', 'app/blog/[slug]/page.tsx'],
  ]
  for (const [prefix, data, template] of dynamic) {
    const tpl = fileWithImports(root, template)
    for (const [slug, text] of entries(root, data)) out[prefix + slug] = { hash: hash(tpl.text + '\n' + text), files: [...tpl.files, data] }
  }
  return out
}

/** Fingerprint of every page in the sitemap, keyed by path. */
export function fingerprints(root = process.cwd()): Record<string, string> {
  return Object.fromEntries(Object.entries(sources(root)).map(([p, s]) => [p, s.hash]))
}

export function readStamps(root = process.cwd()): Stamps {
  try {
    return JSON.parse(read(root, STAMPS_FILE) || '{}')
  } catch {
    return {}
  }
}

/** Today in India, YYYY-MM-DD. */
export function todayIST() {
  return new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10)
}

/** Day of the last commit touching any of the files (or HEAD if none given); undefined without git. */
function commitDay(root: string, files: string[] = []) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d
  } catch {}
  return undefined
}

/** True when any of the files has uncommitted edits (only meaningful in a working copy). */
function hasUncommitted(root: string, files: string[]) {
  try {
    return execFileSync('git', ['status', '--porcelain', '--', ...files], { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() !== ''
  } catch {
    return false
  }
}

/** The day a changed page changed: today for uncommitted edits, else the last commit touching its files. */
function changedDay(root: string, files: string[]) {
  if (hasUncommitted(root, files)) return todayIST()
  return commitDay(root, files) ?? commitDay(root) ?? todayIST()
}

/** Pages whose fingerprint no longer matches lib/lastmod.json, with the day each changed. */
export function changedPages(root = process.cwd()): Record<string, Stamp> {
  const stamps = readStamps(root)
  const out: Record<string, Stamp> = {}
  for (const [path, src] of Object.entries(sources(root))) {
    const s = stamps[path]
    if (s && s.hash === src.hash) continue
    const day = changedDay(root, src.files)
    out[path] = { hash: src.hash, date: s && s.date > day ? s.date : day }
  }
  return out
}

/**
 * Last-changed day for every page. Unchanged pages keep their stored date. A changed page
 * (fingerprint differs from lib/lastmod.json) gets the day of the last commit that touched
 * its files — stable across later, unrelated deploys — or today when git is unavailable.
 */
export function pageDates(root = process.cwd()): Record<string, string> {
  const stamps = readStamps(root)
  const changed = changedPages(root)
  const out: Record<string, string> = {}
  for (const path of Object.keys(sources(root))) out[path] = changed[path]?.date ?? stamps[path].date
  return out
}
