import path from 'path'
import config from '../../../build/config.js'
import fetch from 'node-fetch'

const { serverPath, clientPath, publicPath } =
  config[process.env.NODE_ENV || "production"];

const __dirname = path.resolve();

// Production specific middleware for express
export default async (express, app, done) => {
  app.use(
    "/static",
    express.static(path.join(__dirname, "./buildClient/static"))
  );
  app.use(
    "/server",
    express.static(path.join(__dirname, "./buildServer"))
  );
  try {
    fetch("http://localhost:3001/restart");
  } catch (e) {
    console.error(e);
  }

  const rederThunk = await import("../../server-entry.js"); // eslint-disable-line import/no-unresolved
  try {
    // static path where files such as images will be served from
    const serverRemder = rederThunk.default();
    app.get("/*", serverRemder);
  } catch (e) {
    throw new Error("Cant find webpack client stats file");
  }

  done();
};
