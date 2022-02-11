// deprecated...
import { NodeModuleFederation } from '@telenko/node-mf'

import webpack from 'webpack'
import path from 'path'
import { loaders } from './loaders.js'
import plugins from './plugins.js';
import resolvers from './resolvers.js';

const __dirname = path.resolve()
const deps = '^16.8.6'

export default {
  name: "server",
  target: "async-node",
  mode: "production",
  entry: ["@babel/polyfill", path.resolve(__dirname, "./server/index.js")],
  output: {
    path: path.resolve(__dirname, "./buildServerNode"),
    filename: "[name].cjs",
    libraryTarget: "commonjs2",
    publicPath: "http://localhost:3002/server_node/",
    clean: true,
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
    new NodeModuleFederation({
      name: "website2",
      library: { type: "commonjs2" },
      filename: "container.js",
      remotes: {
        storybook: "storybook@http://localhost:3003/server/container.js"
      },
      shared: {
        react: {
          requiredVersion: deps,
        },
        ["react-dom"]: {
          requiredVersion: deps,
        },
      },
    })
  ],
  stats: {
    colors: true,
  },
};
