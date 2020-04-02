const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清空打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 静态资源拷贝
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
    login: path.resolve(__dirname, '../src/login.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // 必须是绝对路径
    // 配置了多文件打包，注意加这里的[name]，让不同的html引用各自的js
    filename: '[name]-bundle.[hash:6].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "../src")
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
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.[hash:6].html', // 打包后的文件名
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false, // 是否折叠空白
      },
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/login.html'),
      filename: 'login.[hash:6].html', // 打包后的文件名
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false, // 是否折叠空白
      },
      chunks: ['login'],
    }),
    // 清理打包文件目录
    new CleanWebpackPlugin(),
    // 静态资源拷贝
    new CopyWebpackPlugin(
      [{
        from: path.resolve(__dirname, '../public/js/*.js'),
        to: path.resolve(__dirname, '../dist', 'js'),
        flatten: true,
      }],
      {
        ignore: ['other.js']
      }
    ),
  ]
}