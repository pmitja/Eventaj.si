---
name: eventaj-redesign
description: Build or restyle an eventaj.si page in the new redesign look (the /redesign home and /photo-booth-redesign pattern) — Red Hat type, night/porcelain/berry/champagne palette, prominent prices, real event photos, marquees, inquiry dialog. Use when asked to make another page "po tem vzorcu", e.g. /360-photo-booth-redesign, /qr-galerija-redesign, an event landing page, or to port an existing route to the redesign.
---

# Eventaj redesign pattern

The reference implementation lives in `components/sections/eventaj/redesign/`:

- `redesign-page.tsx` is the home page (route `app/redesign/page.tsx`).
- `photo-booth-page.tsx` is a service subpage (route `app/photo-booth-redesign/page.tsx`). **Copy this one first** when building a new service or landing page: it shows the full section vocabulary in one file.

Read both files and `redesign.css` before writing anything. Reuse what's there and invent as little as possible.

## Hard rules

1. **eventaj.si is live on Vercel.** Never commit, push to `main`, or touch production data without the user's explicit OK. A new page ships as a *preview route* `app/<slug>-redesign/page.tsx` with `robots: { index: false, follow: false }`, and its `canonical` points at the live URL it will replace. Leave live routes alone unless the user says to swap them.
2. **All copy is Slovenian**, plain and concrete, in second person singular (tikanje, "rezerviraj", "preveri"). Don't invent facts, prices, clients or reviews. Take them from `content/eventaj/*` (`data.ts`, `event-pages.ts`, `proof.ts`, `album-pricing.ts`, `qr-gallery-pricing.ts`, `service-visuals.ts`, `equipment.ts`) or from the live page you are porting.
3. **Prices are never hardcoded twice.** Import them from content (`photoPackages`, `photoBoothQrGalleryPrice`, `getAlbumPriceLabel` …). If a number exists only in the live page's JSX, move it into content first.
4. **No italic anywhere.** `<em>` inside a title is the accent: wine on light grounds, champagne on dark grounds (handled by `redesign.css`). Never add a serif.
5. **Show the price early.** Every service page puts an `ev-tag` price above the h1 (`Paketi od 299 €`) and has a priced packages section with `id="cenik"` that the tag links to.
6. **Use real photos only**, from `public/application/**` (event folders, `hero-collage`, `photo-booth-hero`, `birthday-parties`, `wedding-photos`, prints in `serviceHeroVisuals`). Never put a caption overlay on photos. Only generate an image (fal, `FAL_KEY` in `.env`, never printed) for abstract backgrounds such as the CTA ground, and only when asked.

## Page skeleton

```tsx
import { evDisplay, evSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { FontScope } from "./font-scope";
import { RedesignHeader } from "./redesign-header";
import { RedesignClosing, RedesignFooter } from "./redesign-footer";
import "./redesign.css";

export function XRedesignPage() {
  return (
    <div className={cn("ev", evDisplay.variable, evSans.variable)}>
      <FontScope />
      <a href="#ev-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--ev-champagne)] focus:px-5 focus:py-3 focus:text-[var(--ev-night)]">Preskoči na vsebino</a>
      <RedesignHeader />
      <main id="ev-main">{/* sections */}<RedesignClosing /></main>
      <RedesignFooter />
    </div>
  );
}
```

The route file exports `metadata` (title, description, canonical to the live URL, noindex) and `export const dynamic = "force-static"`.

## Section order for a service or landing page

Alternate the grounds so no two neighbouring sections share one:

| # | Section | Ground | Reuse |
|---|---|---|---|
| 1 | Hero: rotating real photos, price tag(s), h1 with `<em>`, lede, primary CTA, slide controls | `ev-dark` | `hero-slides.tsx` (`useHeroSlides`, `HeroSlideImages`, `HeroSlideControls`); model on `photo-booth-hero.tsx`. Home hero form: `hero-booking-fields.tsx` |
| 2 | Client logo marquee | porcelain | `<ClientMarquee />` as-is |
| 3 | What's included: icon list in a 3-col ruled grid | porcelain | `Features` in photo-booth-page |
| 4 | Showcase cards (photo + champagne icon circle + text + optional `ev-tag` price) | `ev-dark ev-wine-bg` | `Props` |
| 5 | Event types: 2×2 photo cards linking to event pages; **Poroke and Rojstni dnevi first** | porcelain | `EventTypes` + `eventCardOrder` |
| 6 | Specs: sticky h2 + icon `dl` | porcelain with top rule | `Specs` |
| 7 | Real output wall (prints / clips) | wine | `<PrintWall title secondary />`, `held-frame-clips.tsx` for 360 video |
| 8 | Packages `id="cenik"`: white cards, the featured one `ev-dark ev-berry-bg`, big `ev-price` | `ev-blush-bg` | `Packages`; on home `price-spotlight.tsx` + `price-board.tsx` |
| 9 | Upsell (QR galerija) | `ev-dark` | `QrOffer` |
| 10 | Reviews: stat cards + two auto-moving rows | porcelain | `<RedesignReviews />` |
| 11 | FAQ | porcelain | `<RedesignFaq items moreLink />` |
| 12 | Closing CTA | dark photo ground | `<RedesignClosing />` |

Drop the sections the page has no content for. Don't fill gaps with placeholders.

## Vocabulary (from `redesign.css`)

- **Tokens:** `--ev-night #1c0d17`, `--ev-porcelain #f8f1ea`, `--ev-white #fffaf5`, `--ev-stone`, `--ev-mist`, `--ev-wine #b0255a` (berry accent), `--ev-wine-deep`, `--ev-blush #edccbe`, `--ev-champagne #e8c27a`, `--ev-rule`, `--ev-gutter`. Use `var(--ev-…)` only, never raw hex in components.
- **Grounds:** `ev-dark` (night), `ev-wine-bg`, `ev-berry-bg`, `ev-blush-bg`. Put `ev-dark` together with a coloured ground whenever the text must turn light.
- **Type:**
  - `ev-display` (Red Hat Display 500, tight) for every heading.
  - `ev-h2` for section titles, `ev-lede` for intros.
  - `ev-price` + `ev-tabular` for numbers.
  - Sizes go through clamp, e.g. `text-[clamp(56px,5.4vw,80px)]` for package prices.
- **Pieces:**
  - `ev-wrap` is the content width.
  - `ev-tag` is a price pill; add `ev-tag-berry` for the second product.
  - `ev-badge`, `ev-icon`, `ev-link`, `ev-rule` (border colour), `ev-photo` (frame with hover zoom).
- **Buttons:** `ev-btn` plus one of `ev-btn-primary` (champagne), `ev-btn-dark` or `ev-btn-ghost`. They are pill buttons that lift on hover and press on click. Inside a square form, add `!rounded-none`.
- **Layout habit:** heading and lede on a 12-col grid: `lg:col-span-7` for the h2, `lg:col-span-4 lg:col-start-9` for the lede, aligned at `lg:items-end`. Sections use `py-24 md:py-36`, cards `rounded-[20px]`, and grids use `gap-3`/`gap-5`.
- **Motion:**
  - The `ev-rise` hero entrance and `ev-drift` on the active hero slide.
  - `ev-marquee` / `ev-marquee-track` (+`-slow`, `-reverse`) for anything that scrolls on its own. It pauses on hover and focus and needs a visible pause button.
  - Everything stops under `prefers-reduced-motion` (motion-reduce variants wrap marquee content into a static grid).
  - No carousels with arrows and no timed tabs.
- **Same size:** repeated items in a row (logo pills, review cards) get fixed width and height, so a marquee never looks ragged. Logos are sized by optical area (`logoBox` in `client-marquee.tsx`), not by equal height.

## Conversion wiring

Every CTA opens the inquiry dialog, so never link to a contact page:

```tsx
<InquiryTrigger defaults={{ type: "Photo Booth" | "360 Booth", hours: "3", qrGallery: true, albumSize: "small" }} className="ev-btn ev-btn-primary">…</InquiryTrigger>
```

Inside client code, use `openInquiryDialog({...})` from `@/components/inquiry/inquiry-trigger`. Package rows prefill their package. Check that each `type` value matches what the dialog's select accepts.

## shadcn inside the dark world

Popover, Select and Calendar from `@/components/ui/*` default to `dark:bg-gray-800`. Override the content with `ev-tokens z-[70] !bg-[var(--ev-white)] !text-[var(--ev-night)] rounded-[16px] border-0`. The scroll lock of Radix is neutralised in `redesign.css` (`scrollbar-gutter: stable`), so don't add another fix.

## Verify before reporting

1. Run `npx tsc --noEmit -p .` and expect no new errors.
2. Start the dev server with preview_start name `eventaj` (port 3000).
3. Check the page in a **clean** headless browser, because the user's own browser may hold stale dev chunks:
   ```bash
   node .claude/skills/eventaj-redesign/verify.mjs http://localhost:3000/<route> <scratch-dir>
   ```
   It runs at 1440 and 390 and prints horizontal overflow, console errors, marquee movement, unequal repeated items and broken images. It also saves full-page screenshots. Look at the screenshots yourself and fix what you see before reporting.
4. In the reply to the user (in Slovenian), say what changed, what was verified and that nothing is committed. If the user says "nič ne dela", tell them to use *Clear site data* or an incognito window.

## Known content gaps to ask about, not guess

- Real photos of props or setups the page wants but doesn't have: ask the user to send them.
- Copy that conflicts with recent commits: for example, the equipment copy says "do 10 miz" while the dashboard allows 20.
