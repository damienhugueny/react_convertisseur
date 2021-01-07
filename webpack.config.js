const path = require('path');

module.exports = {
    mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, use: 'babel-loader',
      },
      {
        test: /\.css$/i, use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/i, use: ["style-loader", "css-loader", "sass-loader"],
      }
    ]
  },
};
