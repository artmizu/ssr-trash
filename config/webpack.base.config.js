const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

module.exports = {
  mode:'development',
  devtool: 'source-map',
  output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: '[name].[chunkhash].js'
	},
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          "plugins": ["@babel/plugin-syntax-dynamic-import"]
        }
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}