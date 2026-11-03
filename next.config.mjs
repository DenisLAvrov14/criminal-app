const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.vzakone.com',
        pathname: '/assets/**',
      },
    ],
    // Next 16 разрешает только перечисленные значения quality (Hero использует 100)
    qualities: [50, 75, 100],
  },

  // SVG импортируются как React-компоненты (QuickLinks и др.)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
