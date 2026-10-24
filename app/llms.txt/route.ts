import { absoluteUrl, partnerProgram, phoneHref, site } from '@/lib/site'
import { services } from '@/lib/services'
import { projects } from '@/lib/work'

// llms.txt: a plain-text map of the site for AI assistants and answer engines.
export const dynamic = 'force-static'

export function GET() {
  const body = `# ${site.name}

> ${site.description}

Location: ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, ${site.address.countryName}
Phone: ${phoneHref.replace('tel:', '')}
Languages: English, Hindi

## Services
${services.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.metaDescription}`).join('\n')}

## Case studies
${projects.map((p) => `- [${p.name}](${absoluteUrl(`/work/${p.slug}`)}) (${p.industry}): ${p.summary}`).join('\n')}

## Partner programme
- [Partner programme](${absoluteUrl('/partners')}): Partners who bring a client earn up to ${partnerProgram.share.max}% of the net project value (after pass-through costs), rising with project size. Paid within ${partnerProgram.payoutDays} business days of each client payment.

## Company
- [About](${absoluteUrl('/about')})
- [Contact](${absoluteUrl('/contact')})
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
