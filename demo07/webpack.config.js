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