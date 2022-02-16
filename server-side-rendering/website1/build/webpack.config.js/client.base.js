const path = require("path");
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const { client: clientLoaders } = require("./loaders");
const plugins = require("./plugins");
const common = require("./common.base");
const deps = require('../../package.json').dependencies
module.exports = merge(common, {
  name: "client",
  target: "web",
  entry: ["@babel/polyfill", path.resolve(__dirname, "../../src/index.js")],
  output: {
    publicPath: "http://localhost:3001/static/",
  },
  module: {
    rules: clientLoaders,
  },
  plugins: [
    ...plugins.client,
    new ModuleFederationPlugin({
      name: "website1",
      filename: "container.js",
      remotes: {
        // website2 is the server downstream that is only for csr, in order to compile without error, fetch the website2 script from the 
        // server_downstream directory
        website2: "website2@http://localhost:3002/static/container.js",
        storybook: "storybook@http://localhost:3003/static/container.js",
      },
      shared: [{ "react": deps.react, "react-dom": deps["react-dom"] }],
    }),
  ],
});
