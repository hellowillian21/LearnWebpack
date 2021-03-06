# LearnWebpack
#### 本仓库是学习webpack的一些例子。  
#### 通过查看分支来查看webpack配置的过程。  

## 踩坑
- 配置多入口对应对页面时，出口文件应加上`[name]`,例如：`filename: '[name]-bundle.[hash:6].js`  

- 使用`MiniCssExtractPlugin.loader`热更新CSS时，`MiniCssExtractPlugin`抽离的CSS名不应加上`[hash]`，否则会导致热更新样式不刷新。  

- 关于`@babel/polyfill`配置按需加载，无需在入口文件引入，另需安装`3`版本的`core-js`:    

  ```
  npm install --save core-js@3
  ```
  `.babelrc`配置：  

  ```
  "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": 3
        }
      ]
    ]
  ```  

- 当前`webpack`默认使用的是`TerserWebpackPlugin`压缩js，默认就开启了多进程和缓存，构建时，在项目中可以看到`terser`的缓存文件`node_modules/.cache/terser-webpack-plugin`。  

- `speed-measure-webpack-plugin` 和 `HotModuleReplacementPlugin` 不能同时使用，否则会报错。  

- 如果一些第三方模块没有`AMD`/`CommonJS`规范版本，可以使用 `noParse` 来标识这个模块，这样 `Webpack` 会引入这些模块，但是不进行转化和解析，从而提升 `Webpack `的构建性能 ，例如：`jquery` 、`lodash`。  

  ```
  //webpack.config.js
  module.exports = {
      //...
      module: {
          noParse: /jquery|lodash/
      }
  }
  ```
- `tree-shaking`的主要作用是用来清除代码中无用的部分。目前在`webpack4`我们设置mode为production的时候已经自动开启了`tree-shaking`。但是要想使其生效，生成的代码必须是`ES6`模块。不能使用其它类型的模块如`CommonJS`之流。如果使用`Babel`的话，这里有一个小问题，因为Babel的预案（preset）默认会将任何模块类型都转译成`CommonJS`类型，这样会导致`tree-shaking`失效。修正这个问题也很简单，在`.babelrc`文件或在`webpack.config.js`文件中设置`modules： false`就好了。  

  ```
  // .babelrc
  {
    "presets": [
      ["@babel/preset-env",
        {
          "modules": false
        }
      ]
    ]
  }
  ```