const paths = require("./paths");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const glob = require("glob");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

module.exports = merge(common, {
  mode: "production",

  splitChunks: {
    cacheGroups: {
      // 配置提取模块的方案
      default: false,
      styles: {
        name: "styles",
        test: /\.(s?css|less|sass)$/,
        chunks: "all",
        enforce: true,
        priority: 10,
      },
      common: {
        name: "chunk-common",
        chunks: "all",
        minChunks: 2,
        maxInitialRequests: 5, // 最大的按需(异步)加载次数
        minSize: 0,
        priority: 1,
        enforce: true,
        reuseExistingChunk: true,
      },
      vendors: {
        name: "chunk-vendors",
        test: /[\\/]node_modules[\\/]/,
        chunks: "all",
        priority: 2,
        enforce: true,
        reuseExistingChunk: true,
      },
      // ... 根据不同项目再细化拆分内容
    },
  },
  optimization: {
    runtimeChunk: true, //运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。
    minimize: true, // 开启最小化
    minimizer: [
      /// new CssMinimizerPlugin({
      //   parallel: 4,
      // }),
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      // 重复打包问题
      cacheGroups: {
        vendors: {
          // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true,
        },
      },
    },
  },
  plugins: [
    // 打包体积分析
    new BundleAnalyzerPlugin(),
    // 提取 CSS
    new MiniCssExtractPlugin({
      filename: "[hash].[name].css",
    }),
    // CSS Tree Shaking
    new PurgeCSSPlugin({
      paths: glob.sync(`${paths.appSrc}/**/*`, { nodir: true }),
    }),
  ],
});
