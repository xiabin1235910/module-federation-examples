const path = require("path");
const { merge } = require("webpack-merge");
const fs = require("fs");
const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const { NodeAsyncHttpRuntime } = require("@telenko/node-mf");
const common = require("./common.base");
const { server: serverLoaders } = require("./loaders");
const plugins = require("./plugins");
const config = require("../config").default;
const deps = require('../../package.json').dependencies
const { serverPath } = config[process.env.NODE_ENV || "development"];

module.exports = merge(common, {
  name: "server",
  // target: "async-node",
  target: false,
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../src/index.js")],
  // entry: {
  //   main: ["@babel/polyfill", path.resolve(__dirname, "../../server/index.js")],
  //   website2: ["@babel/polyfill", path.resolve(__dirname, "../../server/index.js")]
  // },
  output: {
    path: serverPath,
    filename: "[name].js",
    libraryTarget: "commonjs2",
    publicPath: "http://localhost:3003/server/",
    clean: true
  },
  externals: ["enhanced-resolve"],
  module: {
    rules: serverLoaders,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    ...plugins.server,
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "storybook",
      library: { type: "var", name: "storybook" },
      // library: { type: "commonjs2" },
      filename: "container.js",
      exposes: {
        "./Button": "./src/components/Button",
      },
      shared: [{ "react": deps.react, "react-dom": deps["react-dom"] }],
    }),
    new NodeAsyncHttpRuntime(),
  ],
  stats: {
    colors: true,
  },
});
