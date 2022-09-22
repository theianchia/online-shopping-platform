module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
};

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:30000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
