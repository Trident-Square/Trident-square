# Website versions

Every design version is saved as a git tag. To bring one back, say the number or the name (e.g. "go back to v2 Trident").

| Version | Name | What it looks like | Git tag |
|---|---|---|---|
| v0 | Original | The old site: indigo gradients, aurora backgrounds, AI-generated thumbnails | `v0-original` |
| v1 | Editorial | First redesign: light editorial layout, Geist font, rounded cards, padel video in hero | _not saved — superseded before versioning started_ |
| v2 | Trident | Condensed poster type, "Talks¹ Thinks² Ships³" hero with live console, trident services drawing, hover-preview work index, animated footer wordmark, sharp corners | `v2-trident` |
| v3 | Trident Pro | v2 + full-width mega menu, automation-first positioning, 10 services | `v3-trident-pro` |

## Restore a version

```bash
git checkout <tag>          # look at it
git checkout -b restore-<tag> <tag>   # keep working from it
```
