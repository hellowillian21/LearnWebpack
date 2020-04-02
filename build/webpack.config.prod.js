const WebpackMerge = require('webpack-merge')
const path = require('path')
const WebpackBaseConfig = require('./webpack.config.base')
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// 打包量化
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new SpeedMeasurePlugin()

const WebpackConfig = WebpackMerge(WebpackBaseConfig, {
  mode: 'production',
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    // 抽离css
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:6].css",
      chunkFilename: "[id].css",
      publicPath: './'
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({}),
    new BundleAnalyzerPlugin()
  ]
})

module.exports = smp.wrap(WebpackConfig)
