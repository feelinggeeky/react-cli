const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const paths = require('./paths')

module.exports =  merge(common, {
  // 开发模式
  mode: 'production',
  // 输出
  output: {
    // bundle 文件名称 【只有这里和开发环境不一样】
    filename: '[name].[contenthash].bundle.js',
    
    // bundle 文件路径
    path: paths.appDist,
    
    // 编译前清除目录
    clean: true
  },
})


