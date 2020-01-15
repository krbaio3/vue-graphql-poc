module.exports = {
  transpileDependencies: [
    "vuetify",
  ],
  devServer: {
    progress: false,
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  chainWebpack: (config) => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
  },
}
