import { permanentRedirect } from 'next/navigation'

// Old URL — case studies now live at /work. next.config also 308s this path.
export default function PortfolioRedirect() {
  permanentRedirect('/work')
}
