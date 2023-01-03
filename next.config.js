// @ts-check

// const isProd = process.env.NODE_ENV === 'production'

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
    },
  },
}

module.exports = nextConfig
