import { MetadataRoute } from 'next'
import { qrGalleryUseCases } from '@/content/qr-gallery'
import { guides } from '@/content/nasveti'
import { equipmentProducts } from '@/content/eventaj/equipment'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://www.eventaj.si'
	// Release date — bump this when content meaningfully changes (avoids a
	// fresh lastmod on every build, which Google learns to distrust).
	const currentDate = '2026-09-03'

	return [
		// Main pages
		{
			url: baseUrl,
			lastModified: currentDate,
			changeFrequency: 'weekly',
			priority: 1.0,
		},

		// Product pages
		{
			url: `${baseUrl}/360-photo-booth`,
			lastModified: currentDate,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/photo-booth`,
			lastModified: currentDate,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/cenik`,
			lastModified: currentDate,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/oprema-za-dogodke`,
			lastModified: currentDate,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		...equipmentProducts.map(({ slug, images }) => ({
			url: `${baseUrl}/oprema-za-dogodke/${slug}`,
			lastModified: currentDate,
			changeFrequency: 'weekly' as const,
			priority: 0.9,
			images: images.map(({ src }) => `${baseUrl}${src}`),
		})),
		{
			url: `${baseUrl}/qr-galerija`,
			lastModified: currentDate,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/qr-galerija/funkcije`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/qr-galerija/poroka`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/qr-galerija/poslovni-dogodek`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.9,
		},
		...qrGalleryUseCases
			.filter(({ slug }) => !['poroke', 'poslovni-dogodki'].includes(slug))
			.map(({ slug }) => ({
				url: `${baseUrl}/qr-galerija/za-dogodke/${slug}`,
				lastModified: currentDate,
				changeFrequency: 'monthly' as const,
				priority: 0.8,
			})),
		// Advice hub and guides
		{
			url: `${baseUrl}/nasveti`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		...guides.map((guide) => ({
			url: `${baseUrl}/nasveti/${guide.slug}`,
			lastModified: guide.updated,
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		})),
		// SEO landing pages by event type
		...[
			'photo-booth-za-poroko',
			'photo-booth-za-rojstni-dan',
			'photo-booth-za-poslovni-dogodek',
			'photo-booth-za-obletnico',
			'360-booth-za-poroko',
			'360-booth-za-rojstni-dan',
			'360-booth-za-poslovni-dogodek',
			'360-booth-za-promocijo',
			'360-booth-za-festival',
		].map((slug) => ({
			url: `${baseUrl}/${slug}`,
			lastModified: currentDate,
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		})),

		// Product FAQ pages
		{
			url: `${baseUrl}/photo-booth/faq`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${baseUrl}/360-photo-booth/faq`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		// FAQ
		{
			url: `${baseUrl}/pogosta-vprasanja`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.7,
		},

		// Legal pages
		{
			url: `${baseUrl}/zasebnost`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.3,
		},
		{
			url: `${baseUrl}/pogoji-uporabe`,
			lastModified: currentDate,
			changeFrequency: 'monthly',
			priority: 0.3,
		},
	]
}
