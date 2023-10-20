// @ts-check

// @ts-ignore
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin")

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: "debug",
})

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    // @ts-ignore
    appDir: true,
  },
}

module.exports = withVanillaExtract(nextConfig)
