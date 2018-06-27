const path = require('path');

module.exports = {
    
  mode: "development",
  
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: "ACL",
    libraryTarget: "umd",
  },

  target: 'node',

  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        }
      ]
  }

}