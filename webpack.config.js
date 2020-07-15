const Obfuscator = require('webpack-obfuscator')

module.exports = {
  context: __dirname + '/app',
  mode: 'none',
  entry: {
    app1:'./app1',
    app2:'./app2'
  },
  output: {
    path: __dirname + '/public/javascripts',
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new Obfuscator({rotateUnicodeArray: true}, [])
  ],
};
