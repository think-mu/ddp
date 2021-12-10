module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'utils': '@/utils',
        'components': '@/components',
        'service': '@/service',
        'views': '@/views',
        'router': '@/router'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://rcjg.gzfda.gov.cn',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
}