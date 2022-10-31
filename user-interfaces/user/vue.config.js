module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
};

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://13.251.16.251:5003',
        // target: 'http://localhost:5003',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '^/po': {
        target: 'http://13.251.105.185:5100',
        // target: 'http://localhost:5002',
        changeOrigin: true,
        pathRewrite: {
          '^/po': ''
        }
      }
    }
  }
}
