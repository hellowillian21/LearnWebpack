const WebpackMerge = require('webpack-merge')
const Webpack = require('webpack')
const path = require('path')
const WebpackBaseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const apiMocker = require('mocker-api')

module.exports = WebpackMerge(WebpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: '3000', // 默认是8080
    quiet: false, // 默认不启用
    inline: true, // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", //终端仅打印 error
    overlay: true, // 当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的
    clientLogLevel: "silent", // 日志等级
    compress: true, // 是否启用 gzip 压缩
    publicPath: "/",
    contentBase: "../dist",
    hot: true,
    // 代理到后端的地址，解决跨域
    proxy: {
      "/api": "http://localhost:4000"
    },
    // 使用mock
    before(app) {
      // 方法一
      app.get('/api/mock', (req, res) => {
        res.json({ msg: '来自前端mock的消息' })
      })

      // 方法二
      apiMocker(app, path.resolve(__dirname, '../mock/mock.js'))
    }
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: true,
              reloadAll: true
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
    new Webpack.HotModuleReplacementPlugin(),
    // 抽离css
    new MiniCssExtractPlugin({
      filename: "css/[name].css", // 加hash会导致热更新无效
      chunkFilename: "[id].css",
      publicPath: './'
    }),
  ]
})