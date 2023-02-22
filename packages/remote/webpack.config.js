const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const { dependencies } = require("./package.json");

const federationConfig = {
  name: "Remote",
  filename: "remoteEntry.js",
  exposes: {
    "./Button": "./src/components/Button",
    // './Components':'./src/components',
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};

module.exports = {
  entry: {
    main: path.join(__dirname, "./src/index.js"),
  },
  cache: false,

  mode: "development",
  devtool: "source-map",
  optimization: {
    minimize: false,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 4000,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: "auto",
  },
  infrastructureLogging: {
    level: "log",
  },
  module: {
    rules: [
      // {
      //   test: /\.m?js/,
      //   type: "javascript/auto",
      //   resolve: {
      //     fullySpecified: false,
      //   },
      // },
      // {
      //   test: /\.(css|s[ac]ss)$/i,
      //   use: ["style-loader", "css-loader", "postcss-loader"],
      // },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-react",
              "@babel/preset-env",
            ],
            // plugins: [["@babel/transform-runtime"]],
          },
        },
      },
    ],
  },
  plugins: [
    // new ModuleFederationPlugin(federationConfig),
    new FederatedTypesPlugin({
      federationConfig,
    }),

    new HtmlWebpackPlugin({
      template: "public/index.html",
      title: "Webpack App",
      filename: "index.html",
      chunks: ["main"],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  target: "web",
};
