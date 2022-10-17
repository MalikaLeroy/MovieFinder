/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_KEY : '15395a4f3b604ba4d9e88de8eeedd953',
    SERVER : 'https://api.themoviedb.org/3'
  },
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['image.tmdb.org'],
    deviceSizes: [576, 768, 992, 1080, 1200, 1920, 2048, 3840]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config;
  }
}

module.exports = nextConfig;

