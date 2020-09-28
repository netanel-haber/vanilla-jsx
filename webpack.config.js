const path = require('path');

const publicPath = path.join(__dirname, "public");

module.exports = {
  entry: './src/index.jsx',
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ["@babel/plugin-transform-react-jsx"]
        }
      },
      {
        test: /\.jsx$/,
        loader: 'string-replace-loader',
        options: {
          search: /^/,
          replace: `/** @jsx dom */\nimport dom from 'dom/dom';\n`,
        }
      },
    ]
  },
  output: {
    path: path.resolve(publicPath, 'js'),
    filename: 'main.js',
    publicPath: "/public"
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, "src"), 'node_modules']
  },
  devServer: {
    contentBase: publicPath,
    watchContentBase: true,
    compress: true
  },
  devtool: "eval-source-map",
  stats: {
    colors: true
  }
};