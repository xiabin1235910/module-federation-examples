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
  mode: "production",
  target: false,
  entry: ["@babel/polyfill", path.resolve(__dirname, "./server/index.js")],
  output: {
    path: path.resolve(__dirname, "./buildServer"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
    publicPath: `http://localhost:${process.env.PORT}/server/`,
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
      name: "storybook",
      library: { type: "var", name: "storybook" },
      // library: { type: "commonjs2" },
      filename: "container.js",
      exposes: {
        "./Button": "./src/components/Button.js",
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
