const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
// const fs = require("fs");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const common = require("./common.base");
const { server: serverLoaders } = require("./loaders");
const plugins = require("./plugins");
const config = require("../config");

const { serverPath } = config[process.env.NODE_ENV || "development"];

const deps = require('../../package.json').dependencies

const remotePath = path.resolve(
  __dirname,
  "../../../storybook/buildServer/container.js"
)


const { NodeModuleFederation } = require("@telenko/node-mf");

module.exports = merge(common, {
  name: "server",
  target: "async-node",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../server/index.js")],
  output: {
    path: serverPath,
    filename: "[name].js",
    libraryTarget: "commonjs2",
    publicPath: "http://localhost:3001/server/"
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
    // new ModuleFederationPlugin({
    new NodeModuleFederation({
      name: "website1",
      library: { type: "commonjs2" },
      filename: "container.js",
      remotes: {
        // website2: remotePath
        website2: "website2@http://localhost:3002/server_downstream/container.js",
        storybook: "storybook@http://localhost:3003/server/container.js"
        // website2: {
        //   // we dont need to do this, just intersting to see in action
        //   external: `promise new Promise((resolve)=>{ console.log('requring remote');delete require.cache['${remotePath}']; resolve(require('${remotePath}')) })`
        // },
      },
      shared: [{ "react": deps.react, "react-dom": deps["react-dom"] }],
    }),
  ],
  stats: {
    colors: true,
  },
});
