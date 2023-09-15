const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    proxy: {
      '/mini':{
        target:'http://localhost:3004',
        pathRewrite: { '^/mini': '' },
        ws: true,//用于支持websocket，默认值为true
        changeOrigin: true//用于控制请求头中的host值。
      },
      '/huge': {
        target: 'http://localhost:3005',
        pathRewrite: { '^/huge': '' },
        ws: true,//用于支持websocket，默认值为true
        changeOrigin: true//用于控制请求头中的host值。
      }
    }
  }
})
