module.exports = {
  transpileDependencies: [
    "vuetify",
  ],
  devServer: {
    progress: false,
  },
  configureWebpack: {
    devtool: 'source-map',
  }
}
