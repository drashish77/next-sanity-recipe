/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
    loader: 'custom',
    path: '/',
  },
}

module.exports = nextConfig
