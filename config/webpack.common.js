const paths = require("./paths");
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ctx = {
  isEnvDevelopment: process.env.NODE_ENV === 'development',
  isEnvProduction: process.env.NODE_ENV === 'production',
}
const {
  isEnvDevelopment,
  isEnvProduction
} = ctx

module.exports = {
  // 入口
  entry: {
    index: "./src/index.tsx",
  },
   // 输出
   output: {
    // 仅在生产环境添加 hash
    filename: ctx.isEnvProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
    path: paths.appDist,
    // 编译前清除目录
    clean: true,
  },
  resolve: {
      alias: {
        '@': paths.appSrc, // @ 代表 src 路径
      },
      extensions: ['.tsx', '.ts', '.js', '...'], 
      modules: ['node_modules', paths.appSrc],
      symlinks: false,
  },
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "es2015",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: paths.appSrc,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
        ],
      },
      {
        test: /\.module\.(scss|sass)$/,
        include: paths.appSrc,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          isEnvProduction && MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: "css-loader",
            options: {
              // Enable CSS Modules features
              modules: true,
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          // 将 PostCSS 编译成 CSS
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // postcss-preset-env 包含 autoprefixer
                    "postcss-preset-env",
                  ],
                ],
              },
            },
          },
          {
            loader: 'thread-loader',
            options: {
              workerParallelJobs: 2 // 当使用 thread-loader 时，需要设置 workerParallelJobs: 2。
            }
          },
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: paths.appSrc,
        type: "asset/resource",
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        include: [paths.appSrc],
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      title: "release_v0",
    }),
    // 为进度百分比添加了加粗和绿色高亮态样式
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    }),
  ],
};
