# PayLow Staffing — Website (Next.js 14)

A pixel-faithful, production-ready replica of [paylowstaffing.com](https://paylowstaffing.com) rebuilt on a modern stack. Includes every page from the live site, a fully-working pricing calculator, accessible mobile navigation, an FAQ with search, an SEO-friendly sitemap/robots, and a contact form ready to forward to GoHighLevel.

> Owned by **Kleegr** · Repo: <https://github.com/kleegr/paylowstaffing-website>

---

## Stack

| Layer | Tech |
| --- | --- |
| Framework | **Next.js 14** (App Router) |
| Language | **TypeScript 5** |
| Styling | **Tailwind CSS 3.4** with custom orange palette |
| Icons | `lucide-react` |
| Forms | `/api/contact` (webhook-forwardable) |
| Deployment | Vercel-ready |

## Getting started

```bash
npm install
cp .env.example .env.local       # optional in dev
npm run dev                       # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check |

## Environment variables

| Variable | Required | What |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical site URL. Defaults to `https://paylowstaffing.com`. |
| `CONTACT_FORM_WEBHOOK_URL` | optional | If set, `POST /api/contact` forwards JSON there. Without it, submissions log to the console. PayLow's GoHighLevel form URL: `https://lc.paylowstaffing.com/widget/form/1bJDrrS4rOrnEZPBoXDJ` |
| `NEWSLETTER_WEBHOOK_URL` | optional | Same idea for newsletter signups. |

## Pricing calculator

`src/components/PricingCalculator.tsx`. Math:

| Rate cadence | Multiplier (hours) |
| --- | --- |
| Hourly | 1 |
| Per Week | 40 |
| Per Month | 173 |
| Per Year | 2,080 |

```
onshore  = $30 × employees × multiplier   (US-average baseline)
offshore = $7  × employees × multiplier   (PayLow flat rate)
savings  = onshore − offshore
```

Default state (Hourly, 1 employee) produces **$30 / $7 / $23** — matches the live screenshot.

## Asset hosting

Images hot-link from `paylowstaffing.com/wp-content/...`. `next.config.mjs` allowlists the hostname; `<Image>` uses `unoptimized`.

To self-host: mirror assets into `public/images/`, update URLs in `src/lib/content.ts`, drop `unoptimized`.

## Deployment (Vercel)

1. Push to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Add env vars under Settings → Environment Variables.
4. Deploy.

## Accessibility & SEO

- Semantic landmarks throughout
- Visible focus styles, "Skip to content" link
- Mobile drawer locks body scroll + `aria-expanded`/`aria-controls`
- FAQ page emits `FAQPage` JSON-LD
- Per-page `<title>` + `<meta description>`, Open Graph, Twitter Card
- `sitemap.xml` and `robots.txt` generated via Next.js metadata API

## What couldn't be matched exactly

- **Newsletter pop-up modal** on home — replaced with inline newsletter form in the footer.
- **Custom Elementor decorative shapes** — approximated with CSS gradients.
- **Live chat widget** — not included; drop any chat script into `layout.tsx` to add.
- **Exact Elementor positioning** — cropping done via Tailwind rather than per-element WP controls.

## Credits

- Design based on the live site by [Chaim Teitelbaum](https://www.chaimteitelbaum.com).
- Rebuild by Kleegr with Claude as engineering pair.
- All rights reserved.
