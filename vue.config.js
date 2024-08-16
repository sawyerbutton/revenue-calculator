const { defineConfig } = require('@vue/cli-service')

// 基本路径根据当前是生产环境还是开发环境来判断
let BASE_URL = process.env.NODE_ENV === 'production' ? '/revenue-calculator/' : '/'

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: BASE_URL
})
