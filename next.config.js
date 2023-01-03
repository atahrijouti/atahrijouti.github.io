// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: {
      fileName: false,
      ssr: true,
      displayName: true,
    },
  },
}

module.exports = nextConfig
