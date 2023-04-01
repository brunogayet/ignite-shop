/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    domains: [
      'files.stripe.com'
    ]
  },
  // experimental: {
  //   images: {
  //     allowFutureImage: true
  //   }
  // }
}

module.exports = nextConfig
