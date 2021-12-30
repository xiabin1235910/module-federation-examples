import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

const __dirname = path.resolve();
const dotenvFile = path.resolve(__dirname, "../.env");
if (fs.existsSync(dotenvFile)) {
  dotenv.config({
    path: dotenvFile,
  });
}

export default {
  dotenv: path.resolve(__dirname, "../.env"),
  development: {
    clientPath: path.resolve(__dirname, "../buildClient"),
    serverPath: path.resolve(__dirname, "../buildServer"),
    publicPath: "/static/",
  },
  production: {
    clientPath: path.resolve(__dirname, "../buildClient"),
    serverPath: path.resolve(__dirname, "../buildServer"),
    publicPath: "/static/",
  },
};
