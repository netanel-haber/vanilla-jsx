const path = require('path');

const publicPath = path.join(__dirname, "public");

module.exports = {
  entry: './src/index.jsx',
  mode: "production",
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
  devtool: "none",
  stats: {
    colors: true
  }
};