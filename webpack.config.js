var path =  require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry:  './app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].bundle.js'
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use:  ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
         test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use:[
          {loader: 'url-loader'}
        ]
      },
      {
        test: require.resolve('jquery'),
        use: [{
              loader: 'expose-loader',
              options: 'jQuery'
          },{
              loader: 'expose-loader',
              options: '$'
          }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      httpHeader: JSON.stringify('http://api.doudoudc.com')
    }),
    new ExtractTextPlugin("css/styles.css")
  ]
};
