const isDev = process.env.NODE_ENV === 'development'
const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清空打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 静态资源拷贝
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill',
    './src/index.js',
    './src/login.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    filename: 'bundle.[hash:6].js',
    publicPath: './'
  },
  devServer: {
    port: '3000', // 默认是8080
    quiet: false, // 默认不启用
    inline: true, // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", //终端仅打印 error
    overlay: true, // 当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的
    clientLogLevel: "silent", // 日志等级
    compress: true, // 是否启用 gzip 压缩
    publicPath: "/",
    contentBase: "./public",
    hot: true
  },
  // 开发环境下源码映射，生产环境可以使用 none 或者是 source-map
  devtool: isDev ? 'cheap-module-eval-source-map' : 'none',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/ // 排除 node_modules 目录
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 10K 即资源大小小于 10K 时，将资源转换为base64，超过 10K，将图片拷贝到dist 目录
              esModule: false,
              name: '[name]_[hash:6].[ext]',
              outputPath: 'assets'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // js注入html
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', // 打包后的文件名
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false, // 是否折叠空白
      },
      // hash: true // 是否加上hash，默认是 false
    }),
    new HtmlWebpackPlugin({
      template: './public/login.html',
      filename: 'login.html', // 打包后的文件名
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false, // 是否折叠空白
      },
      // hash: true // 是否加上hash，默认是 false
    }),
    // 清理打包文件目录
    new CleanWebpackPlugin(),
    // 静态资源拷贝，将单个文件或整个目录复制到构建目录
    new CopyWebpackPlugin(
      [{
        from: 'public/js/*.js',
        to: path.resolve(__dirname, 'dist', 'js'),
        flatten: true,
      }],
      {
        ignore: ['other.js']
      }
    ),
    // 抽离css
    new MiniCssExtractPlugin({
      // filename: "css/[name].[hash:6].css",
      filename: "css/[name].css", // 加hash会导致热更新无效
      chunkFilename: "[id].css",
      publicPath: './'
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({}),
    // dev环境热更新
    new Webpack.HotModuleReplacementPlugin()
  ]
}
