const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const paths = require('./paths')

module.exports =  merge(common, {
  // 开发模式
  mode: 'development',
  // 输出
  output: {
    // bundle 文件名称
    filename: '[name].bundle.js',
    
    // bundle 文件路径
    path: paths.appDist,
    
    // 编译前清除目录
    clean: true
  },
  // 开发工具，开启 source map，编译调试
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要。
    static: './dist',
  },
})

