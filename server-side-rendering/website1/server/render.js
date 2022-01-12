import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { ChunkExtractor } from "@loadable/server";
import path from "path";
import App from "../src/components/App";
import { getMfChunks, createScriptTag, createStyleTag } from "./mfFunctions";
const statsFile = path.resolve("./buildClient/static/stats.json");
import { StaticRouter } from "react-router-dom/server";

export default async (req, res, next) => {
  console.log(req.url)
  try {
    // This is the stats file generated by webpack loadable plugin
    // We create an extractor from the statsFile
    console.log(statsFile)
    const extractor = new ChunkExtractor({ statsFile });
    // Wrap your application using "collectChunks"
    const jsx = extractor.collectChunks(createApp(App, req));

    // Render your application
    const html = renderToString(jsx);
    // You can now collect your script tags
    const scriptTags = extractor.getScriptTags(); // or extractor.getScriptElements();
    // You can also collect your "preload/prefetch" links
    const linkTags = extractor.getLinkTags(); // or extractor.getLinkElements();
    // And you can even collect your style tags (if you use "mini-css-extract-plugin")
    const styleTags = extractor.getStyleTags(); // or extractor.getStyleElements();
    // console.log('extractor',jsx)
    // console.log('scriptTags',scriptTags)

    // const appString = renderToString(app)
    const helmet = Helmet.renderStatic();

    const [mfRequiredScripts, mfRequiredStyles] = await getMfChunks(extractor);

    // const chunkNames = flushChunkNames()
    // const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })
    // res.render('send', { csrfToken: req.csrfToken() })
    return res.send(`<!doctype html>
     <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <link rel="shortcut icon" href="data:;base64,=">
            ${mfRequiredStyles.map(createStyleTag).join("")}
            ${styleTags}
        </head>
       
        <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${html}</div>
          ${mfRequiredScripts.map(createScriptTag).join("")}
          ${scriptTags}
        </body>
      </html>`);
  } catch (err) {
    console.error(err);
  }
};

const createApp = (App, req) => {

  return <App />
};
