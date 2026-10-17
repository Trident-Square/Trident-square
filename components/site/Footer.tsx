import Link from 'next/link'
import Logo from './Logo'
import FooterWordmark from './FooterWordmark'
import { phoneHref, site, whatsappHref } from '@/lib/site'
import { services } from '@/lib/services'
import { projects } from '@/lib/work'

const company = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Partner programme', href: '/partners' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted">
              Automation systems, AI and custom software for startups and growing businesses. Built in Noida, shipped worldwide.
            </p>
            <address className="mt-6 not-italic text-[14px] leading-relaxed text-muted">
              {site.address.street},<br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}, {site.address.countryName}
            </address>
            <div className="mt-5 flex flex-col gap-1.5 text-[14px]">
              <a href={phoneHref} className="link-underline w-fit">{site.phoneDisplay}</a>
              {site.email ? (
                <a href={`mailto:${site.email}`} className="link-underline w-fit">{site.email}</a>
              ) : null}
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-underline w-fit">
                WhatsApp
              </a>
            </div>
          </div>

          <FooterCol title="Services" className="lg:col-span-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="link-underline">
                {s.name}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Case studies" className="lg:col-span-3">
            {projects.slice(0, 6).map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="link-underline">
                {p.name}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Company" className="lg:col-span-2">
            {company.map((c) => (
              <Link key={c.href} href={c.href} className="link-underline">
                {c.label}
              </Link>
            ))}
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline">LinkedIn</a>
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a>
            <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="link-underline">Facebook</a>
          </FooterCol>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col gap-3 py-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]">AI &amp; software studio · Noida, India</p>
        </div>
      </div>
      <FooterWordmark />
    </footer>
  )
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow">{title}</p>
      <div className="mt-5 flex flex-col items-start gap-2.5 text-[14.5px] text-ink-2">{children}</div>
    </div>
  )
}
