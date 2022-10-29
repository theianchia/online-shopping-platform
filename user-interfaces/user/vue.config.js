module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
};

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        // target: 'http://13.212.104.153:5003',
        target: 'http://localhost:5003',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '^/po': {
        // target: 'http://13.212.104.153:5003',
        target: 'http://localhost:5002',
        changeOrigin: true,
        pathRewrite: {
          '^/place-order': ''
        }
      }
    }
  }
}
