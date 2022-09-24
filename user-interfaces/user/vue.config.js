module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
};

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://items:5003',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
