const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
//配置了 SpeedMeasurePlugin 后，热更新就无效了，会提示 runtime is undefined。
//解决方案:仅在分析构建速度时打开 SpeedMeasurePlugin 插件，
module.exports = merge(common, {
  // 开发模式
  mode: "development",

  // 开发工具，开启 source map，编译调试
  devtool: "eval-cheap-module-source-map",
  devServer: {
    // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要。
    static: "./dist",
    hot: true,
    port: 8080, // 端口号
    open: true, // 是否自动打开浏览器
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});

module.exports = isNeedSpeed ? smp.wrap(config) : config;
