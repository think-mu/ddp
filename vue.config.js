module.exports = {
  // publicPath: './',
  // publicPath: process.env.NODE_ENV === 'production' ? '/dist' : '/' ,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/' ,
  // outputDir: './build',
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        utils: '@/utils',
        components: '@/components',
        service: '@/service',
        views: '@/views',
        router: '@/router',
        'base-ui': '@/base-ui'
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    // port: 8082,
    // inline: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://rcjg.gzfda.gov.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  }
}
