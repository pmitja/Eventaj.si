# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Slovenian hosts planning a celebration who want a photo booth or 360° booth on the night. By volume the largest groups are **birthday parties** (milestone birthdays, often at home or in a garden) and **weddings** (couples planning months ahead). **December is strong with corporate year-end parties** (novoletne zabave, poslovni zaključki), booked by an office manager or HR person. All arrive comparing a few rental options and want to know price, availability for their date, and whether the result looks good.

## Product Purpose

Eventaj.si rents a Photo Booth (DSLR camera + instant print) and a 360° Booth (slow-motion video, shared by QR) with an attendant present for the whole event, anywhere in Slovenia. It also rents event extras (standing tables, games, welcome boards, table numbers, guest books, etc.) and sells a QR Gallery (guests upload photos via QR, no app). Success on the marketing site = a sent inquiry (the inquiry dialog) or a visit to the price list (/cenik).

## Positioning

A small, owner-run team from Lenart near Maribor that shows up in person, sets up, runs the booth all night and prints on the spot; transparent prices published online (Photo Booth from 299 €, 360° Booth from 319 €, QR Gallery 35 € per event), reply within 24 h.

## Operating Context

- Inquiry: global `InquiryDialog`, opened from any `InquiryTrigger` / `openInquiryDialog()` via the `eventaj:open-inquiry` window event. Multi-step form with date picker.
- Price list and configurator at /cenik (`PricingConfigurator`), FAQ at /pogosta-vprasanja, tips at /nasveti.
- Event landing pages: photo-booth-za-poroko, -za-rojstni-dan, -za-poslovni-dogodek, -za-obletnico, 360 variants, foto-stojnica, foto-koticek.
- QR Gallery product lives at galerija.eventaj.si; info page /qr-galerija.
- Site language: Slovenian (lang="sl"), informal "ti" in body copy, mixed with "vi" in some headings.

## Capabilities and Constraints

- Next.js 16 App Router, Tailwind, Radix/shadcn UI, framer-motion, next/image. Production is live on Vercel at www.eventaj.si; nothing ships to main without the owner's OK.
- SEO/AEO matters: JSON-LD (WebSite, Organization, LocalBusiness with aggregate rating), canonical URLs, static rendering.
- Proof numbers live in `content/eventaj/proof.ts` (5,0 ★ from 13 Google reviews, 100+ events) and must match the Google Business Profile.

## Brand Commitments

- Name: Eventaj.si. The logo (`public/application/logo.svg`, `mobile-logo.svg`) is binding and stays as is.
- Everything else visual (fonts, colours, layout) is open to replacement (owner, 2026-11-12).

## Evidence on Hand

- Real photos: `public/application/hero-collage/`, `wedding-photos/`, `birthday-parties/`, `primeri/` (MSI, Forvis Mazars, birthdays), `busniess-booths/`, `photo-booth-hero/`, `oprema/`.
- Real 360° videos with posters: `public/application/360-photo-booth-videos/`.
- Client logos: Mlada Slovenija (MSI), Forvis Mazars, Autodelta, SKSG (`public/application/*.webp`).
- Testimonials in `content/eventaj/data.ts` (`testimonials`); rating/count in `proof.ts`.
- Do not invent additional reviews, client logos, event counts or prices.

## Product Principles

1. Show the night, not the equipment: real guests, real prints, real 360° clips.
2. Price and next step are never more than one glance away.
3. Local and personal: a real team that turns up, not a platform.
4. Speak to the occasion the visitor is planning (birthday, wedding, company party).
