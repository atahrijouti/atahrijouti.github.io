// @ts-check

// @ts-ignore
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin")

const withVanillaExtract = createVanillaExtractPlugin()

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    unoptimized: true,
  },
}

module.exports = withVanillaExtract(nextConfig)
