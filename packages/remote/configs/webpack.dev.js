const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  cache: true,
  mode: "development",
  devServer: {
    static: {
      directory: path.join(process.cwd(), "dist"),
    },
    port: 4000,
    hot: true,
    compress: false,
    historyApiFallback: true,
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
});
