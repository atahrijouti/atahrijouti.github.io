// @ts-check

// const isProd = process.env.NODE_ENV === 'production'

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  basePath: "./",
  // assetPrefix: isProd ? '/your-github-repo-name/' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = config
