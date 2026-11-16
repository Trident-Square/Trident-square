/**
 * Refreshes lib/lastmod.json: any page whose content fingerprint changed gets today's
 * date. Run `npm run lastmod` before committing content changes and commit the updated
 * lib/lastmod.json. Skipping it is safe: the sitemap still dates changed pages by their
 * last commit at build time — refreshing just keeps those dates fixed.
 *
 *   node scripts/update-lastmod.mts            update changed pages
 *   node scripts/update-lastmod.mts --seed X   (one-off) seed from a JSON map of path → date
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { changedPages, fingerprints, readStamps, STAMPS_FILE, type Stamps } from '../lib/lastmod.ts'

const root = process.cwd()
const fp = fingerprints(root)
const old = readStamps(root)
const seedIdx = process.argv.indexOf('--seed')
const seed: Record<string, string> = seedIdx > 0 ? JSON.parse(readFileSync(process.argv[seedIdx + 1], 'utf8')) : {}
const changedNow = changedPages(root)

const next: Stamps = {}
const changed: string[] = []
for (const path of Object.keys(fp).sort()) {
  const prev = old[path]
  if (prev && prev.hash === fp[path]) {
    next[path] = prev
  } else {
    next[path] = { hash: fp[path], date: seed[path] ?? changedNow[path].date }
    changed.push(path)
  }
}

const before = JSON.stringify(old, null, 2)
const after = JSON.stringify(next, null, 2) + '\n'
if (before + '\n' !== after) writeFileSync(join(root, STAMPS_FILE), after)
console.log(changed.length ? `lastmod: ${changed.length} page(s) updated — ${changed.join(', ')}` : 'lastmod: no page content changed')
