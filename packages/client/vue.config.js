module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    progress: false,
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV == 'development' ? 'eval-cheap-module-source-map' : false,
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
};
