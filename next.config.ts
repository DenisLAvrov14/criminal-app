// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // поддержка загрузки изображений из Directus
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8055',
        pathname: '/assets/**',
      },
    ],
  },

  // другие ваши опции…
  webpack(config, { isServer }) {
    // Добавляем SVGR-лоадер для .svg, импортируемых из компонентов
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
