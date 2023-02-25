const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const federationConfig = require("./federationConfig");

module.exports = merge(baseConfig, {
  cache: false,
  mode: "production",
  devServer: {
    static: {
      directory: path.join(process.cwd(), "dist"),
    },
    port: 4000,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new FederatedTypesPlugin({
      federationConfig,
    }),
  ],
});
