const packageJsonDeps = require("./package.json").dependencies;
const { NodeModuleFederation } = require("@telenko/node-mf");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    if (!isServer) {
      config.cache = false;
      config.output.publicPath = "auto";
      config.module.rules.push({
        test: /_app.js/,
        loader: "./federation-loader.js",
      });
    }
    const mfConf = {
      name: "test",
      filename: "remoteEntry.js",
      exposes: {
        './test': "./pages/index.js"
      },
      remotes: {
        remoteLib: isServer
          ? "remoteLib@http://localhost:3002/node/remoteEntry.js"
          : "remoteLib"//This is a hack (I cannot run successfully MF in client-side with NextJS and React, maybe doing smth wrong)
        // {
        //   external: `external new Promise((r, j) => {
        //   window['remoteLib'].init({
        //     react: {
        //       "${packageJsonDeps.react}": {
        //         get: () => Promise.resolve().then(() => () => globalThis.React),
        //       }
        //     }
        //   });
        //   r({
        //     get: (request) => window['remoteLib'].get(request),
        //     init: (args) => {}
        //   });
        // })`,
        // },
        // : "remoteLib@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        react: {
          eager: true,
          requiredVersion: packageJsonDeps["react"],
          singleton: true,
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJsonDeps["react-dom"],
          singleton: true,
        },
        "next/dynamic": {
          eager: true,
          requiredVersion: false,
          singleton: true,
        },
        "next/link": {
          eager: true,
          requiredVersion: false,
          singleton: true,
        },
        "next/head": {
          eager: true,
          requiredVersion: false,
          singleton: true,
        }
      },
    };

    if (!isServer) {
      mfConf.remoteType = 'var';
    }

    return {
      ...config,
      plugins: [
        ...config.plugins,
        new (isServer ? NodeModuleFederation : ModuleFederationPlugin)(mfConf),
      ],
      experiments: { topLevelAwait: true },
    };
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
