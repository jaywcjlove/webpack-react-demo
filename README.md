这个仓库是以前学习和收集的一些WebPack插件和例子，和对这些插件简单的应用。主要是玩转`Webpack` 和`React`。参考阮大大的例子[ruanyf/webpack-demos](https://github.com/ruanyf/webpack-demos) ，更容易读懂。还有尤小右大大的例子[vuejs-templates/webpack](https://github.com/vuejs-templates/webpack)和[vuejs-templates/webpack-simple](https://github.com/vuejs-templates/webpack-simple) 在 `Webpack` 中应用 `vue`，参考这些例子结合官方文档看，慢慢就玩转 [Webpack](https://webpack.github.io/) 和 [React](http://facebook.github.io/react/)。

其它例子你可以研究研究 😄

- [redux应用的例子](https://github.com/matthew-sun/redux-example) [说明文档](http://www.cnblogs.com/matthewsun/p/4773646.html)
- [React+Redux系列教程](https://github.com/lewis617/react-redux-tutorial)

# 准备工作

首先全局安装两个包 [Webpack](https://www.npmjs.com/package/webpack) 和 [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)

```bash
$ npm i -g webpack webpack-dev-server
```


接下来克隆这个仓库和安装它的依赖

```bash
$ git clone https://github.com/jaywcjlove/webpack-demos.git
$ cd webpack-demos
$ npm install
```

然后进入演示的例子

```bash
$ cd demo01
$ webpack-dev-server
```

在浏览器中访问 `http://127.0.0.1:8080` 进行预览查看生成的效果。

上面的 `webpack` `webpack-dev-server` 是全局安装，你也可以不用全局安装，放到你的 `package.json` 文件中，例如：

```json 
{
  // ...
  "scripts": {
    "dev": "webpack-dev-server --devtool eval --progress --colors",
    "deploy": "NODE_ENV=production webpack -p"
  },
  // ...
}
```

这种方法你得这么运行 `npm run dev` 和 `npm run deploy`


# Webpack第一个例子

Webpack 是前端构建工具，类似于 `gulp` 和 `grunt`，相对于 `gulp` 和 `grunt`，构建起来相对复杂一点点。这里有官方文档介绍 [Webpack](http://webpack.github.io/docs/what-is-webpack.htm)

第一个简单的例子[demo01](#)首先得有 一个配置文件`webpack.config.js` 记得名字，必须得这样，Webpack可以直接识别配置文件。

```js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

**多个入口文件** 只需要更改配置文件`webpack.config.js` 中的内容

- `entry` 配置中添加你所有文件。
- `filename` 值设置为 `filename: '[name].js'`

```js
module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: '[name].js'
  }
};
```

添加一个入口`js`文件`main.js`。

```js
document.write('<h1>Hello World</h1>');
```

添加静态页面 `index.html`

```html
<html>
  <body>
    <script type="text/javascript" src="bundle.js"></script>
  </body>
</html>
```

## 运行命令

```bash
$ webpack
```

会生成 `bundle.js` 你直接页面中引用并且打开它。

```bash 
# 这个可以使用 http://localhost:8080 来预览
$ webpack-dev-server
```

上面这个命令是开发模式没有生成js 文件，它不是生成这是一个重载 Webpack 服务。

## 常用的命令。

- `webpack` – 开发的时候构建，没有进行任何处理有很多注释的js文件
- `webpack -p` – 这个是构建压缩过的js文件
- `webpack --watch` – 监控文件变化持续构建
- `webpack -d` – 生产出 `.map` 文件，这个文件调试非常有用[JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
- `webpack --colors` – 输出带有颜色的信息

# 包工具应用

## Babel加载

加载预处理插件，可将 `JSX/ES6` 转换成 `js` 文件。官方完整的[加载列表](http://webpack.github.io/docs/list-of-loaders.html)

接下来这个例子[demo02](#)依赖下面的包工具

```bash
npm install babel-loader babel-preset-es2015 babel-preset-react react react-dom --save
```

创建 `index.html` 文件

```html 
<html>
<body>
    <script type="text/javascript" src="bundle.js"></script>
</body>
</html>
```

创建 `main.jsx` 文件

```js
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.querySelector('#wrapper')
);
```

创建 `webpack.config.js` 文件

```js 
module.exports = {    
    entry: './main.jsx',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {
              test: /\.js[x]?$/,
              exclude: /node_modules/,
              loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
        ]
    }
};
```

上面的 `webpack.config.js` 中的 `module.loaders` 是一个装载机，配置你需要装载的东西，你可以改成明了的书写方法：

```json 
{
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }
    ]
}
```

## CSS加载

Webpack允许你在js文件中引入CSS文件，然后用 `CSS-loader` 对CSS文件进行预处理，这个例子[demo03](#)依赖`CSS-loader` 和 `style-loader`。
安装依赖

```bash
npm install css-loader style-loader --save
```

main.js

```js 
require('./app.css');
```

app.css

```css 
body {
  background-color: blue;
}
```

index.html

```html
<html>
  <head>
    <script type="text/javascript" src="bundle.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

webpack.config.js

```js
module.exports = {
    entry: './main.js',
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders:[
        { test: /\.css$/, loader: 'style-loader!css-loader' },
      ]
    }
};
```

`style-loader` 会将样式插入到 html 标签中，运行打开页面将是一个内联样式。会将上面的 HTML 干成下面这样的内联元素插入页面。

```html
<head>
  <script type="text/javascript" src="bundle.js"></script>
  <style type="text/css">
    body {
      background-color: blue;
    }
  </style>
</head>
```

## 图片加载

图片加载需要依赖 `file-loader` 和 `url-loader` ，安装依赖。[demo04](#)

```bash
npm install url-loader file-loader --save
```

main.js

```js 
var img1 = document.createElement("img");
img1.src = require("./small.png");
document.body.appendChild(img1);
var img2 = document.createElement("img");
img2.src = require("./big.png");
document.body.appendChild(img2);
```

index.html

```html
<html>
  <body>
    <script type="text/javascript" src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```js
module.exports = {
    entry: './main.js',
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders:[
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
      ]
    }
};
```

`url-loader` 插件后面跟上参数，`'url-loader?limit=8192'` 当图片小于 `8192` bytes，会将图片生成 `data:image/png;base64` base64 图片。两张图片加载方式分别不同：

```html 
<img src="data:image/png;base64,iVBOR...uQmCC">
<img src="4853ca667a2b8b8844eb2693ac1b2578.png">
```

## CSS组件加载

`css-loader?modules` (查询模块的参数) 使用[CSS模块](https://github.com/css-modules/css-modules)的规格。加载CSS模块默认是本地作用域，如果你要将CSS作用于全局，你得将选择器放入global中如`:global(.h2)` [demo05](#)

index.html

```html
<html>
<body>
    <h1 class="h1">Hello World</h1>
    <h2 class="h2">Hello Webpack</h2>
    <div id="example"></div>
    <script src="./bundle.js"></script>
</body>
</html>
```

app.css

```css
.h1 {color:red; }
:global(.h2) {color: blue; }
```

main.jsx

```js
var React = require('react');
var ReactDOM = require('react-dom');
var style = require('./app.css');
ReactDOM.render(
  <div>
    <h1 className={style.h1}>Hello World</h1>
    <h2 className="h2">Hello Webpack</h2>
  </div>,
  document.getElementById('example')
);
```

webpack.config.js

```js
module.exports = {
    entry: './main.jsx',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'react']
                }
            },{
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'
            }
        ]
    }
};
```

## UglifyJs插件

Webpack 有插件系统来扩展其功能。例如：[UglifyJs Plugin](http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin)将 `main.js` 输出压缩版本的 `bundle.js` [demo06](#)，[UglifyJS 参数设置](https://github.com/mishoo/UglifyJS2#usage)。


main.js

```js
var longVariableName = 'Hello';
longVariableName += ' World';
document.write('<h1>' + longVariableName + '</h1>');
```

index.html

```html
<html>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```

webpack.config.js

```js
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
```

运行之后`main.js` 将被压缩

## HTML Webpack插件

[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) 能创建`index.html` 文件。

main.js

```js
document.write('<h1>Hello World</h1>');
```

webpack.config.js

```js 
var HtmlwebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlwebpackPlugin({
          title: 'Webpack-demos'
        })
    ]
};
```


## 命令启动打开入口路径

[open-browser-webpack-plugin](https://github.com/baldore/open-browser-webpack-plugin) 这是一个傻叉的包工具，就一个特别方便的功能，就是在你运行`webpack-dev-server`命令的时候，自动打开`http://localhost:8080/` 你配置的网址。[demo08](#)
稍做更改`webpack.config.js`中的 module.exports.plugins 添加一个插件。

```js 
plugins: [
    new HtmlwebpackPlugin({
      title: 'Webpack-demos'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
]
```


## 环境变量玩儿法

[demo09](#) 只有在开发环境中使用环境变量，才能使某些代码起作用。

main.js
```js
document.write('<h1>Hello World</h1>');

if (__DEV__) {
  document.write(new Date());
}
```

index.html

```html
<html>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```

webpack.config.js

```js
var webpack = require('webpack');
var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
    entry: './main.js',
    output: {
      filename: 'bundle.js'
    },
    plugins: [devFlagPlugin]
};
```

通过环境变量来运行`webpack-dev-server` 命令

```bash
# Linux & Mac
$ env DEBUG=true webpack-dev-server

# Windows
$ DEBUG=true webpack-dev-server
```

## 代码分割

这个非常重要，构建大型应用的时候，你需要将你的代码分模块，不然你的js越来越大，加载速度越来越慢，分块也适合项目模块化，多人共同应用开发。我们在下面的例子[demo10](#) 用的是CommonJs 的加载方式 `require.ensure` 你可以到官网看跟多的模块加载方式[在这里>>](http://webpack.github.io/docs/code-splitting.html)

main.js

```js
require.ensure(['./a'], function(require) {
    var content = require('./a');
    document.open();
    document.write('<h1>' + content + '</h1>');
    document.close();
});
```

`require.ensure` 告诉 webpack 去加载分割出来的 `a.js` 文件 

a.js

```js
module.exports = 'Hello World';
```

按照上面的书写方式，webpack知道你的依赖关系，根据这个依赖关系输出js，然后在`index.html`页面上引用入口 `js` 文件 `main.js`。

```html
<html>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```js
module.exports = {
    entry: './main.js',
    output: {
      filename: 'bundle.js'
    }
};
```

## 用bundle-loader分割代码

此功能需要安装[bundle-loader](https://www.npmjs.com/package/bundle-loader) [demo11](#) 这个例子只要将 demo10 的例子中的`main.js`文件改改就可以了，然后安装依赖。

```bash
$ npm install --save bundle-loader
```

main.js

```js 
var load = require('bundle-loader!./a.js');
// 异步等待加载完成会后执行
load(function(file) {
    document.open();
    document.write('<h1>' + file + '</h1>');
    document.close();
});
```

运行 `webpack` 命令之后就生成两个js 文件 `bundle.js` 和 `1.bundle.js` 页面 `index.html` 引用入口文件 `bundle.js` 。

## 普通模块React应用

[demo12](#)当多个脚本有共同的部分，可以提取公共部分为一个单独的文件使用commonschunkplugin方法。

```js
// main1.jsx
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById('a')
);

// main2.jsx
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h2>Hello Webpack</h2>,
  document.getElementById('b')
);
```

index.html

```html
<html>
  <body>
    <div id="a"></div>
    <div id="b"></div>
    <script src="init.js"></script>
    <script src="bundle1.js"></script>
    <script src="bundle2.js"></script>
  </body>
</html>
```

webpack.config.js

```js
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
      bundle1: './main1.jsx',
      bundle2: './main2.jsx'
    },
    output: {
      filename: '[name].js'
    },
    module: {
      loaders:[
        {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react']
          }
        },
      ]
    },
    plugins: [
      new CommonsChunkPlugin('init.js')
    ]
}
```

## jQuery加载

[demo13](#)可以提取一些热门库如`jQuery`，我这个例子就加载一下`JSLite`吧，从脚本到一个单独文件也使用`commonschunkplugin`方法。

你需要安装它们才能加载

```bash
$ npm install jquery --save
# 或者
$ npm install jslite --save
```

main.js

```js
var $ = require('jslite');
$('h1').text('Hello World');
```

index.html

```html
<html>
  <body>
    <h1></h1>
    <script src="vendor.js"></script>
    <script src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```js
var webpack = require('webpack');

module.exports = {
    entry: {
      app: './main.js',
      vendor: ['jslite'],
    },
    output: {
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js')
    ]
};
```

### 每个模块中使用JSLite或者jQuery

[demo14](#)这个是有我们要使用 `ProvidePlugin` 方法。[官方文档](http://webpack.github.io/docs/shimming-modules.html)

index.html 

```html 
<html>
  <body>
    <h1></h1>
    <script src="bundle.js"></script>
  </body>
</html>
```

main.js

```js 
$('h1').text('Hello World');
```

webpack.config.js

```js 
var webpack = require('webpack');
module.exports = {
    entry: {
      app: './main.js'
    },
    output: {
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jslite",
        JSLite: "jslite",
        "window.JSLite": "jslite"
      })
    ]
};
```


## 暴露全局变量

[demo15](#)可以在 `webpack.config.js` 中使用 `externals`。[官方文档](http://webpack.github.io/docs/library-and-externals.html)

例如我们有一个`data.js`

```js 
var data = 'Hello World';
```

我们将`data`作为一个全局变量。webpack.config.js

```js 
module.exports = {
    entry: './main.jsx',
    output: {
      filename: 'bundle.js'
    },
    module: {
        loaders:[
          {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          },
        ]
    },
    externals: {
      // require('data') 应用当做一个全局变量引用进来
      'data': 'data'
    }
};
```

现在你可以在你的`main.jsx`文件中可以把 `data` 全局变量当一个包引用进来，实际上它是一个全局变量。

```js
var data = require('data');
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>{data}</h1>,
  document.getElementById('title')
);
```

## 模块热替换
[demo16](#)[hot module replacement with webpack](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) [翻译](https://segmentfault.com/a/1190000003872635) [官方文档Hot Module Replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) 添加或删除模块，在运行应用程序时，无需重新加载刷新页面。现在有[两种方法](http://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement)让webpack服务端模块热更换。

### 使用webpack命令的两个子命令

```bash 
$ webpack-dev-server --hot --inline
```

这两个命令参数的意思是：
- `--hot`: 加`HotModuleReplacementPlugin`切换服务器热加载模式。
- `--inline`: 嵌入运行的`webpack-dev-server`中。
- `--hot --inline`: 添加一个指向 `webpack/hot/dev-server`.

### 修改webpack配置方法

- 将`new webpack.HotModuleReplacementPlugin()`添加到`plugins`中。
- 将`'webpack/hot/dev-server'` 和 `'webpack-dev-server/client?http://localhost:8080',`添加到 `entry`

这样的话你只需要运行下面命令即可。

```bash 
$ webpack-dev-server
```

webpack.config.js

```js 
var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        './index.js'
    ],
    output: {
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
        include: path.join(__dirname, '.')
      }]
    }
};
```

index.html

```html
<html>
    <body>
        <div id='root'></div>
        <p>Hot Module Replacement</p>
        <script src="/static/bundle.js"></script>
    </body>
</html>
```

index.js

```js 
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

ReactDOM.render(<Main />, document.getElementById('root'));
```

main.js

```js
import React, { Component } from 'react';
export default class Main extends Component {
    render() {
        return (
            <h1>Hello World</h1>
        );
    }
}
```


## React 路由

[demo17](#) 使用`Webpack` 使用[React-router](https://github.com/reactjs/react-router/tree/master/docs) 建立路由。这里需要安装`react-router`依赖，v2.x 的React-router与v1.x有区别所以你还是要看看[官方文档](https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.0.0.md)。

```bash 
$ npm install --save React-router
$ webpack-dev-server --history-api-fallback
```

### React Router 配置

- Router 与 Route 一样都是 react 组件 ，它的 history 对象是整个路由系统的核心，它暴漏了很多属性和方法在路由系统中使用；
- Redirect 是一个重定向组件，有 from 和 to 两个属性；
- browserHistory ：
```
Browser history 是由 React Router 创建浏览器应用推荐的 history。它使用 History API 在浏览器中被创建用于处理 URL，新建一个像这样真实的 URL example.com/some/path。
```
- hashHistory ：  
```
这是一个你会获取到的默认 history ，如果你不指定某个 history 。它用到的是 URL 中的 hash（#）部分去创建形如 example.com/#/some/path 的路由。
这个 支持 ie8＋ 的浏览器，但是因为是 hash 值，所以不推荐使用。
```
- createMemoryHistory ：不会在地址栏被操作或读取。

### 路由匹配

```js 
<Route path="/hello/:name">         // 匹配 /hello/michael 和 /hello/ryan
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/michael, 和 /hello/ryan
<Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/hello.html
<Route path="/**/*.jpg">            // 匹配 /files/hello.jpg 和 /files/path/to/file.jpg
```