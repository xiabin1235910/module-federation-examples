const path = require("path");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const { client: clientLoaders } = require("./loaders");
const plugins = require("./plugins");
const common = require("./common.base");
const FederationModuleIdPlugin = require("webpack-federation-module-id-plugin");
const FederationStatsPlugin = require("webpack-federation-stats-plugin");

const port = process.env.PORT;

module.exports = merge(common, {
  name: "client",
  target: "web",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../src/index.js")],
  output: {
    publicPath: `http://localhost:${port}/buildClient/static/`,
    clean: true
  },
  module: {
    rules: clientLoaders,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    ...plugins.client,
    new FederationStatsPlugin(),
    new FederationModuleIdPlugin(),
    new ModuleFederationPlugin({
      name: "storybook",
      library: { type: "var", name: "storybook" },
      filename: "container.js",
      exposes: {
        "./Button": "./src/components/Button",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
