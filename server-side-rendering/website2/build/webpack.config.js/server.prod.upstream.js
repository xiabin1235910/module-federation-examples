const { NodeModuleFederation, NodeAsyncHttpRuntime } = require('@telenko/node-mf')
const webpack = require('webpack')
const path = require('path')

const deps = '^16.8.6'

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

const remotePath = path.resolve(
  __dirname,
  "../../../storybook/buildServer/container.js"
)

module.exports = {
  name: "server",
  mode: "production",
  target: "async-node",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../server/index.js")],
  output: {
    path: path.resolve(__dirname, "../../buildServerUp"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    libraryTarget: "commonjs2",
    publicPath: "http://localhost:3002/server_uptream/",
    clean: true
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
      library: { type: "var", name: "website2" },
      // library: { type: "commonjs2" },
      filename: "container.js",
      remotes: {
        storybook: "storybook@http://localhost:3003/server/container.js",
      },
      shared: {
        react: {
          requiredVersion: deps,
        },
        ["react-dom"]: {
          requiredVersion: deps,
        },
      },
    }),
  ],
  stats: {
    colors: true,
  },
};
