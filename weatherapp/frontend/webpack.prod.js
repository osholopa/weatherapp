const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const GLOBALS = {
  "process.env.ENDPOINT": JSON.stringify(
    process.env.ENDPOINT || "http://0.0.0.0:9000/api"
  ),
};

module.exports = {
  mode: "production",
  devtool: false,
  entry: {
    main: ["@babel/polyfill", path.join(__dirname, "src/index.jsx")],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["src", "node_modules"],
  },
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|svg|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
       // CSS and Sass
       {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public"),
          to: path.resolve(__dirname, "dist"),
          globOptions: {
            ignore: ["**/index.html"],
          }
        },
      ]
    }),
    new HtmlWebpackPlugin({
      template: "src/public/index.html",
      filename: "index.html",
    }),
    new webpack.DefinePlugin(GLOBALS),
  ],
};
