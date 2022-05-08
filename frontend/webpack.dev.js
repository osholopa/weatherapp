const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const GLOBALS = {
  "process.env.ENDPOINT": JSON.stringify(
    process.env.ENDPOINT || "http://0.0.0.0:9000/api"
  ),
};

module.exports = {
  mode: "development",
  cache: true,
  devtool: "cheap-module-source-map",
  entry: {
    main: ["@babel/polyfill", path.join(__dirname, "src/index.jsx")],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["src", "node_modules"],
  },
  devServer: {
    static: ['src/public'],
    allowedHosts: 'all',
    historyApiFallback: true,
    host: process.env.HOST || '0.0.0.0',
    hot: true,
    open: true,
    compress: true,
    port: process.env.PORT || 8000,
  },
  output: {
    filename: "[name].[hash:8].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/public/index.html",
      filename: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ],
  watchOptions: {
    poll: 1000,
  },
};
