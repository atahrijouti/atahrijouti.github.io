// @ts-check

// const isProd = process.env.NODE_ENV === 'production'

/**
 * @type {import('next').NextConfig}
 **/
let config = {
  // basePath: '/gh-pages-test',
  // assetPrefix: isProd ? '/your-github-repo-name/' : '',
  images: {
    unoptimized: true,
  },
}

/**
 * Github pages
 */
if (process.env.GITHUB_REPOSITORY) {
  const repositoryName = process.env.GITHUB_REPOSITORY.split("/")[1]

  config = {
    ...config,
    assetPrefix: `/${repositoryName}/`,
    basePath: `/${repositoryName}`,
  }
}

console.log(config)

module.exports = config
