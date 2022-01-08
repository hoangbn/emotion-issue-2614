module.exports = {
  siteMetadata: {
    title: `Test`,
    description: `Emotion`,
    author: `@hoang-nguyen`,
    lang: `en`
  },
  flags: {
    DEV_SSR: false,
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true
  },
  plugins: [
    {
      resolve: `gatsby-theme-material-ui`,
    },
  ]
};
