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