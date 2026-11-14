import { Baloo_2, Red_Hat_Display, Red_Hat_Text } from 'next/font/google'

// /redesign preview: a friendly neo-grotesk pairing, upright only (no italic anywhere in titles).
export const evDisplay = Red_Hat_Display({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  weight: 'variable',
  variable: '--font-ev-display',
})

export const evSans = Red_Hat_Text({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  weight: 'variable',
  variable: '--font-ev-sans',
})

export const baloo2 = Baloo_2({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  weight: 'variable',
  variable: '--font-baloo2',
})
