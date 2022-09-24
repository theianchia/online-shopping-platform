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
        // target: 'http://localhost:30000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
