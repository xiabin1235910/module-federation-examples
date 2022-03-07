const { loaders } = require('./loaders')

const webpack = require('webpack')
const path = require('path')

const LoadablePlugin = require("@loadable/webpack-plugin");
const FederationModuleIdPlugin = require('webpack-federation-module-id-plugin')
const FederationStatsPlugin = require('webpack-federation-stats-plugin')

const deps = '^16.8.6'

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;


module.exports = {
  name: "client",
  target: "web",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../src/index.js")],
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "../../buildClientDown/static"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "http://localhost:3002/static_downstream/",
    clean: true
  },
  resolve: {
    extensions: [".js", ".mjs", ".jsx", ".css", ".json", ".cjs"],
  },
  module: {
    rules: loaders.client,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new LoadablePlugin({ filename: "stats.json", writeToDisk: true }),
    new FederationStatsPlugin(),
    new FederationModuleIdPlugin(),
    new ModuleFederationPlugin({
      // no library defined here since this container will be treat as `script` in webpack ExternalModule.js
      name: "website2",
      filename: "container.js",
      exposes: {
        "./App": "./src/components/FederationApp"
      },
      remotes: {
        storybook: "storybook@http://localhost:3003/static_downstream/container.js",
        website1: "website1@http://localhost:3001/static_downstream/container.js"
      },
      shared: ["react", "react-dom"],
    }),
    new webpack.NormalModuleReplacementPlugin(
      /node-fetch/,
      "../../build/fetch"),
    new webpack.NormalModuleReplacementPlugin(
      /common\/server/,
      "../../build/common/client.prod")
  ],
}
