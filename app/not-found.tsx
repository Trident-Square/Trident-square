import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col justify-center pt-28">
      <p className="eyebrow">404</p>
      <h1 className="display mt-6 text-[clamp(3rem,9vw,8rem)]">Page not found.</h1>
      <p className="lede mt-6 max-w-lg">The page moved or never existed. These will get you where you need to go:</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/services" className="btn-ghost">Services</Link>
        <Link href="/work" className="btn-ghost">Work</Link>
        <Link href="/contact" className="btn-ghost">Contact</Link>
      </div>
    </section>
  )
}
