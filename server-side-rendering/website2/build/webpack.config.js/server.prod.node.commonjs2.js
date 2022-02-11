// webpack configuration here should be commonjs2 format,
// we cannot use ESM format configuration since there's loadable babel plugin compiled result issue --- remote loadable component cannot be loaded

const { NodeModuleFederation } = require('@telenko/node-mf')
const webpack = require('webpack')
const path = require('path')

const deps = '^16.8.6'

module.exports = {
  name: "server",
  target: "async-node",
  mode: "production",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../server/index.js")],
  output: {
    path: path.resolve(__dirname, "../../buildServerNode"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    libraryTarget: "commonjs2",
    publicPath: "http://localhost:3002/server/",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".mjs", ".jsx", ".css", ".json", ".cjs"],
  },
  externals: ["enhanced-resolve"],
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
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
          // singleton: true,
          // eager: true,
          requiredVersion: deps,
        },
        ["react-dom"]: {
          // singleton: true,
          // eager: true,
          requiredVersion: deps,
        },
      },
    })
  ],
  stats: {
    colors: true,
  },
};
