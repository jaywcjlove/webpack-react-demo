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