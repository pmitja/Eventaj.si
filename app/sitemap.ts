import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://www.eventaj.si'
	// Release date — bump this when content meaningfully changes (avoids a
	// fresh lastmod on every build, which Google learns to distrust).
	const currentDate = '2026-06-15'

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
			url: `${baseUrl}/foto-koticek`,
			lastModified: currentDate,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/foto-stojnica`,
			lastModified: currentDate,
			changeFrequency: 'weekly',
			priority: 0.9,
		},

		// SEO landing pages by event type
		...[
			'photo-booth-za-poroko',
			'photo-booth-za-rojstni-dan',
			'photo-booth-za-poslovni-dogodek',
			'photo-booth-za-maturantski-ples',
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
