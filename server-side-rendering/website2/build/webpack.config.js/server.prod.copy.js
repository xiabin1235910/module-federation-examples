// const path = require("path");
// const { merge } = require("webpack-merge");
// const fs = require("fs");
// const webpack = require("webpack");
// const ModuleFederationPlugin = require("webpack").container
// .ModuleFederationPlugin;
// const { NodeAsyncHttpRuntime } = require("@telenko/node-mf");
// const common = require("./common.base");
// const { server: serverLoaders } = require("./loaders");
// const plugins = require("./plugins");
// const resolvers = require("./resolvers");
// const config = require("../config").default;
// const deps = require('../../package.json').dependencies
// const { serverPath } = config[process.env.NODE_ENV || "development"];

import webpack from 'webpack'
import path from 'path'
import { loaders } from './loaders.js'
import plugins from './plugins.js';
import resolvers from './resolvers.js';

import { NodeAsyncHttpRuntime } from '@telenko/node-mf'

// import * as package1 from '../../package.json'
// const deps = package1.dependencies
const deps = '^16.8.6'

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

const __dirname = path.resolve()

export default {
  name: "server",
  // target: "async-node",
  mode: "production",
  target: false,
  entry: ["@babel/polyfill", path.resolve(__dirname, "./server/index.js")],
  output: {
    path: path.resolve(__dirname, "./buildServer"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
    publicPath: "http://localhost:3002/server/",
    clean: true
  },
  resolve: { ...resolvers },
  externals: ["enhanced-resolve"],
  module: {
    rules: loaders.server,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    ...plugins.server,
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "website2",
      library: { type: "var", name: "website2" },
      // library: { type: "commonjs2" },
      filename: "container.js",
      exposes: {
        "./SomeComponent": "./src/components/SomeComponent",
        // "./App": "./src/components/App"
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps,
        },
        ["react-dom"]: {
          singleton: true,
          requiredVersion: deps,
        },
      },
    }),
    new NodeAsyncHttpRuntime(),
  ],
  stats: {
    colors: true,
  },
};
