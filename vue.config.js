const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 10880,
  },
  transpileDependencies: true,
  lintOnSave:false,
  publicPath:'./'
})
