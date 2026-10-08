# Portfolio Site — Agent Instructions

## Location
This is the source for [joncorral.com](https://joncorral.com), hosted via GitHub Pages from the `main` branch.

## Stack
- Static HTML/CSS/JS — no build step, no framework, no bundler
- `index.html` — main site with all sections (hero, about, work, AI edge, apps, contact)
- `index.css` — all styles (wabi-sabi design system with CSS custom properties)
- `index.js` — scroll animations, reveal system, marquee, cursor effects
- `resume.html` — standalone résumé page
- `work/` — individual work sample pages (social, email, digital, print, radio, video, direct-mail)
- `assets/` — images, fonts, and media

## How to Update
1. Edit the source files directly (HTML/CSS/JS) — never browse the live site to make edits
2. `git add` only the files you changed
3. `git commit -m "descriptive message"`
4. `git push origin main`
5. GitHub Pages deploys automatically within ~60 seconds

## Design System

### Color Palette (CSS Custom Properties)
| Token | Value | Use |
|-------|-------|-----|
| `--ink` | `#1A1A1A` | Primary dark / text |
| `--ink-soft` | `#3D3D3D` | Secondary text |
| `--ink-muted` | `#6B6B6B` | Muted text |
| `--ink-whisper` | `#767676` | Labels, captions |
| `--paper` | `#FAF8F5` | Light background / text on dark |
| `--paper-warm` | `#F5F0EA` | Warm section backgrounds |
| `--vermillion` | `#C84032` | Accent color (links, highlights, hover borders) |
| `--indigo` | `#2C4A6E` | Secondary accent |

### Typography
- **Headings:** `var(--font-serif)` → Cormorant Garamond
- **Body:** `var(--font-sans)` → Inter
- Size scale: `--text-xs` through `--text-5xl` (responsive clamp values)

### Section Types
- `.section--ink` — dark background (`--ink`), light text, ambient vermillion glow via `::before`
- `.section--warm` — warm paper background
- Default — standard `--paper` background

### Card Patterns
- **Glassmorphic cards** (used in AI sections): `background: rgba(250,248,245,0.03)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(250,248,245,0.08)`, `border-radius: 8px`
- **Hover effect**: vermillion border glow + subtle lift (`translateY(-3px)`)

### Scroll Animations
- Add class `reveal` to any element for fade-in-up on scroll
- Stagger delays: `reveal--d1`, `reveal--d2`, `reveal--d3`
- Powered by IntersectionObserver in `index.js` — new elements are auto-detected, no JS changes needed

### Spacing
- Use `var(--space-xs)` through `var(--space-4xl)` and `var(--space-section)` for consistent spacing
- Layout max-width: `var(--max-width)` (1100px) via `.container` class

## Key Sections in index.html
| Section | ID | Class | Description |
|---------|-----|-------|-------------|
| Hero | `hero` | `.hero` | Opening headline + portrait |
| About | `about` | — | Writer narrative + stats |
| Work | `work` | — | Service cards linking to work pages |
| AI Edge | `ai-edge` | `.section--ink` | AI philosophy + capabilities |
| Apps | `ai-apps` | `.section--ink .ai-apps` | Project highlight cards |
| Skills Marquee | — | `.marquee` | Scrolling skills ticker |
| Connect | `connect` | — | Contact CTA |

## Do NOT
- Browse joncorral.com to make edits — always edit source files directly
- Commit all modified files — only commit files relevant to the current task
- Add build tools, frameworks, or dependencies — this is intentionally vanilla HTML/CSS/JS
- Remove existing comments or section markers — they document the structure
