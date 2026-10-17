# Website versions

Every design version is saved as a git tag. To bring one back, say the number or the name (e.g. "go back to v2 Trident").

| Version | Name | What it looks like | Git tag |
|---|---|---|---|
| v0 | Original | The old site: indigo gradients, aurora backgrounds, AI-generated thumbnails | `v0-original` |
| v1 | Editorial | First redesign: light editorial layout, Geist font, rounded cards, padel video in hero | _not saved — superseded before versioning started_ |
| v2 | Trident | Condensed poster type, "Talks¹ Thinks² Ships³" hero with live console, trident services drawing, hover-preview work index, animated footer wordmark, sharp corners | `v2-trident` |
| v3 | Trident Pro | v2 + full-width mega menu, automation-first positioning, 10 services | `v3-trident-pro` |
| v4 | Trident Motion | Dark animated hero with live system map (inputs → Trident Square → your systems) and rotating Talks/Thinks/Ships headline, tools marquee, count-up numbers, animated bento grid of services, device-frame showreel, scroll reveals | `v4-trident-motion` |
| v5 | Studio | Light premium-agency look: headline with inline live product windows, full-width featured case with shutter reveal and parallax, giant outlined word marquee, services index with sticky video preview, staggered work grid, sticky process steps, numbered FAQ with help card, smooth scrolling, one page-hero system across every inner page | `v5-studio` |
| v6 | Monday | One pinned scroll-driven hero: "Your Monday, without us → on autopilot". Scrolling wipes a messy desk (WhatsApp, missed calls, broken sheet, unsent invoice, sticky notes) into automated cards while Busywork / Hours saved / Tasks meters run. Rest of home as v4 (tools marquee, counters, bento, showreel, dark process), v5 FAQ and inner pages, services page cards, floating header, new logo lockup | `v6-monday` |
| v6 | Trident Story | v4 home body with a new opening: "Software that talks¹, thinks² & ships³" hero where headline verb, footnotes and live console are linked; then "We automate your ___" with the draggable before/after desk; floating header with new wordmark; visual service cards on /services; fixed video reveals on work and service pages | `v6-trident-story` |

## Restore a version

```bash
git checkout <tag>          # look at it
git checkout -b restore-<tag> <tag>   # keep working from it
```
