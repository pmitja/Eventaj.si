import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://eventaj.si'
	const currentDate = new Date().toISOString().split('T')[0] // YYYY-MM-DD format

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

		// Blog
		{
			url: `${baseUrl}/blog`,
			lastModified: currentDate,
			changeFrequency: 'weekly',
			priority: 0.8,
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
