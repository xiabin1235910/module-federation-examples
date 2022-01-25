import webpack from 'webpack'
import path from 'path'
import { loaders } from './loaders.js'
import plugins from './plugins.js';
import resolvers from './resolvers.js';

const __dirname = path.resolve()

export default {
  name: "server",
  target: "async-node",
  mode: "production",
  entry: ["@babel/polyfill", path.resolve(__dirname, "./server/index.js")],
  output: {
    path: path.resolve(__dirname, "./buildServerNode"),
    filename: "[name].cjs",
    libraryTarget: "commonjs2",
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
  ],
  stats: {
    colors: true,
  },
};
