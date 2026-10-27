/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  allowedDevOrigins: ['192.168.68.55'],
  outputFileTracingIncludes: {
    "/api/admin/offers/[id]/pdf": [
      "./lib/offers/fonts/**",
      "./lib/offers/assets/**",
      // PDFKit loads standard fonts dynamically, so Next.js does not trace them.
      "./node_modules/**/pdfkit/js/standard-fonts/**",
    ],
  },
  async redirects() {
    return [
      {
        source: "/oprema-za-dogodke/akrilni-kozarci-za-sampanjec",
        destination: "/oprema-za-dogodke/kozarci-za-sampanjec",
        permanent: true,
      },
      {
        source: '/foto-stojnica',
        destination: '/photo-booth',
        permanent: true,
      },
      {
        source: '/foto-koticek',
        destination: '/photo-booth',
        permanent: true,
      },
      {
        source: '/qr-galerija/za-dogodke/poroke',
        destination: '/qr-galerija/poroka',
        permanent: true,
      },
      {
        source: '/qr-galerija/za-dogodke/poslovni-dogodki',
        destination: '/qr-galerija/poslovni-dogodek',
        permanent: true,
      },
      // Old blog (removed 2026-04) still gets impressions; send each post to
      // the closest live page, and anything else under /blog to Nasveti.
      ...[
        ['kako-izbrati-photo-booth', '/photo-booth'],
        ['lokacija-photo-booth', '/photo-booth'],
        ['organizacija-dogodka-photo-booth', '/photo-booth'],
        ['rekviziti-photo-booth', '/photo-booth'],
        ['trendi-ozadja-photo-booth', '/photo-booth'],
        ['trendi-photo-booth-2024', '/photo-booth'],
        ['photo-boothi-spreminjajo-nacin-kako-praznujemo', '/photo-booth'],
        ['korporativni-dogodki-photo-booth', '/photo-booth-za-poslovni-dogodek'],
        ['kreativne-ideje-poroka', '/photo-booth-za-poroko'],
        ['razlogi-360-photo-booth', '/360-photo-booth'],
      ].map(([slug, destination]) => ({
        source: `/blog/${slug}`,
        destination,
        permanent: true,
      })),
      {
        source: '/blog/:path*',
        destination: '/nasveti',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'notion.so',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'galerija.eventaj.si',
      }
    ],
  },
  webpack: (config, { isServer }) => {
    // Add video file handling
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    // Add punycode fallback for non-server builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }

    return config;
  },
}

module.exports = nextConfig
