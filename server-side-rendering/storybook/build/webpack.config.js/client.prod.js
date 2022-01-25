import path from 'path'
import { loaders } from './loaders.js'
import plugins from './plugins.js';
import resolvers from './resolvers.js';
import webpack from 'webpack';

import FederationModuleIdPlugin from 'webpack-federation-module-id-plugin';
import FederationStatsPlugin from 'webpack-federation-stats-plugin';

const deps = '^16.8.6'

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

const __dirname = path.resolve()

export default {
  name: "client",
  target: "web",
  entry: ["@babel/polyfill", path.resolve(__dirname, "./src/index.js")],
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./buildClient/static"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: `http://localhost:${process.env.PORT}/static/`,
    clean: true
  },
  resolve: { ...resolvers },
  module: {
    rules: loaders.client,
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
      remotes: {
        website1: "website1@http://localhost:3001/static/container.js",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps,
        },
        ["react-dom"]: {
          singleton: true,
          eager: true,
          requiredVersion: deps,
        },
      },
    }),
  ],
}
